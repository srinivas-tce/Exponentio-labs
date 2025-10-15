import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { inpulseApiService } from '@/services/inpulseApi';

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
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  syncUserProfile: (userData: any, interests?: Interest[]) => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const loginData = await inpulseApiService.signIn(email, password);
          
          if (loginData.status === 'success' && loginData.data?.token) {
            set({ 
              token: loginData.data.token, 
              isAuthenticated: true, 
              isLoading: false 
            });
            
            // Fetch user details and interests
            await get().fetchUserDetails(loginData.data.token, email);
          } else {
            throw new Error(loginData.message || 'No token received');
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          });
        }
      },

      fetchUserDetails: async (token: string, email: string) => {
        try {
          // Determine if user is facilitator or student based on email
          const isFacilitator = email.endsWith('@technicalcareer.education');
          
          if (isFacilitator) {
            // Handle facilitator profile check and creation
            await get().handleFacilitatorProfile(token, email);
          } else {
            // Handle student profile sync
            await get().handleStudentProfile(token, email);
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch user details',
            isLoading: false 
          });
        }
      },

      handleFacilitatorProfile: async (token: string, email: string) => {
        try {
          console.log('Handling facilitator profile for:', email);
          
          // Skip Inpulse user details call for facilitators - they don't exist there
          // Go directly to check/create facilitator profile in our database
          
          // Try to check if facilitator exists in our database
          let exists = false;
          let existingProfile = null;
          
          try {
            const checkResult = await inpulseApiService.checkFacilitatorProfile(email);
            exists = checkResult;
            if (exists) {
              // Fetch existing facilitator profile from our database
              const response = await fetch(`/api/internal/users/facilitator?email=${encodeURIComponent(email)}`);
              if (response.ok) {
                const result = await response.json();
                existingProfile = result.data.user;
              }
            }
          } catch (checkError) {
            // If check fails (e.g., "record not found"), assume facilitator doesn't exist
            console.log('Facilitator check failed, will create new profile:', checkError);
            exists = false;
          }
          
          if (!exists || !existingProfile) {
            // Redirect to facilitator registration form
            console.log('Facilitator not found, redirecting to registration form');
            set({ isLoading: false });
            
            // Store the email for the registration form
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('facilitatorEmail', email);
              window.location.href = '/facilitator-registration';
            }
          } else {
            // Use existing facilitator profile
            console.log('Using existing facilitator profile:', existingProfile);
            
            const user: User = {
              id: existingProfile.id,
              email: existingProfile.email,
              name: existingProfile.name,
              role: existingProfile.role,
              gender: existingProfile.gender,
              thumbnail: existingProfile.thumbnail,
              email_verified_at: existingProfile.email_verified_at,
            };

            set({ user, isLoading: false });
          }
        } catch (error) {
          console.error('Error handling facilitator profile:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to handle facilitator profile',
            isLoading: false 
          });
        }
      },

      handleStudentProfile: async (token: string, email: string) => {
        try {
          // Fetch user details and interests from Inpulse API
          const userDetails = await inpulseApiService.getUserDetails(token);
          const interests = await inpulseApiService.getUserInterests(token, userDetails.id);

          // Sync user profile with our database
          await get().syncUserProfile(userDetails, interests);
          
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to handle student profile',
            isLoading: false 
          });
        }
      },

      syncUserProfile: async (userData: any, interests?: Interest[]) => {
        try {
          // Sync user profile with our database
          const syncedUser = await inpulseApiService.syncUserToDatabase(userData, interests || []);
          
          const user: User = {
            id: syncedUser.id,
            email: syncedUser.email,
            name: syncedUser.name,
            role: syncedUser.role,
            gender: syncedUser.gender,
            thumbnail: syncedUser.thumbnail,
            email_verified_at: syncedUser.email_verified_at,
            interests: syncedUser.interests || [],
          };

          set({ 
            user, 
            isLoading: false 
          });
          
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sync user profile',
            isLoading: false 
          });
        }
      },

      logout: () => {
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
