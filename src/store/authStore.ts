import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'facility-manager' | 'facilitator' | 'admin';
  gender?: string;
  thumbnail?: string;
  email_verified_at?: string;
  age?: number;
  interests?: Interest[];
}

export interface Interest {
  id: string;
  interest: string;
  sub_interests: SubInterest[];
}

export interface SubInterest {
  id: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  /** Supabase access_token when using Supabase Auth; use for Bearer APIs if needed */
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  /** Restore session from Supabase + load public.users profile */
  hydrateFromSupabase: () => Promise<void>;
}

function mapApiUser(u: any): User {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    gender: u.gender,
    thumbnail: u.thumbnail,
    email_verified_at: u.email_verified_at,
    interests: u.interests || [],
  };
}

/**
 * Syncs auth user into public.users. Returns the row as stored in DB — id may be
 * existing PK from schema.sql (update-by-email), not necessarily auth.users.id.
 */
async function syncUserToPublicTable(params: {
  id: string;
  email: string;
  name: string;
}): Promise<User> {
  const res = await fetch('/api/internal/users/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userData: {
        id: params.id,
        email: params.email,
        name: params.name,
        email_verified_at: new Date().toISOString(),
      },
    }),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(j.message || 'Failed to sync profile');
  }
  if (j.status !== 'success' || !j.data?.user) {
    throw new Error(j.message || 'Failed to sync profile');
  }
  return mapApiUser(j.data.user);
}

async function maybeRedirectFacilitatorOnboarding(user: User) {
  if (
    (user.role !== 'facilitator' && user.role !== 'facility-manager') ||
    typeof window === 'undefined'
  ) {
    return;
  }
  const checkRes = await fetch(
    `/api/internal/users/facilitator?email=${encodeURIComponent(user.email)}`
  );
  if (!checkRes.ok) return;
  const checkData = await checkRes.json();
  if (checkData.status === 'success' && !checkData.data?.exists) {
    sessionStorage.setItem('facilitatorEmail', user.email);
    window.location.href = '/facilitator-registration';
  }
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      hydrateFromSupabase: async () => {
        if (typeof window === 'undefined') return;
        try {
          const supabase = getSupabaseBrowserClient();
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (!session?.user) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
            return;
          }
          const email = session.user.email || '';
          const name =
            (session.user.user_metadata?.full_name as string) ||
            email.split('@')[0] ||
            'User';
          // Sync updates existing row by email when present; returns canonical users.id
          const user = await syncUserToPublicTable({
            id: session.user.id,
            email,
            name,
          });
          set({
            user,
            token: session.access_token,
            isAuthenticated: true,
          });
          await maybeRedirectFacilitatorOnboarding(user);
        } catch {
          // ignore hydrate errors
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const supabase = getSupabaseBrowserClient();
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw new Error(error.message);

          if (!data.session?.user) {
            throw new Error('No session returned');
          }

          const authUser = data.session.user;
          const name =
            (authUser.user_metadata?.full_name as string) ||
            email.split('@')[0] ||
            'User';

          const user = await syncUserToPublicTable({
            id: authUser.id,
            email: authUser.email || email,
            name,
          });

          set({
            token: data.session.access_token,
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          await maybeRedirectFacilitatorOnboarding(user);
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
        }
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        try {
          const supabase = getSupabaseBrowserClient();
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: name },
            },
          });
          if (error) throw new Error(error.message);

          // Email confirmation may leave session null
          if (!data.session?.user) {
            set({
              isLoading: false,
              error: null,
            });
            throw new Error(
              'Check your email to confirm your account, then sign in.'
            );
          }

          const authUser = data.session.user;
          const user = await syncUserToPublicTable({
            id: authUser.id,
            email: authUser.email || email,
            name,
          });

          set({
            token: data.session.access_token,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Sign up failed';
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      logout: async () => {
        try {
          const supabase = getSupabaseBrowserClient();
          await supabase.auth.signOut();
        } catch {
          // still clear local state
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      setToken: (token: string) => {
        set({ token, isAuthenticated: true });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
