import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tiyaqfnzdsfnomtmtxog.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeWFxZm56ZHNmbm9tdG10eG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2OTQwMzAsImV4cCI6MjA0NzI3MDAzMH0.placeholder';

if (!supabaseServiceKey) {
  console.warn('Warning: Missing Supabase service key. Using placeholder key for development.');
}

// Create Supabase client with service role key for server-side operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Supabase service class for database operations
export class SupabaseService {
  private static instance: SupabaseService;
  private supabase: typeof supabase;

  private constructor() {
    this.supabase = supabase;
  }

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  // Execute raw SQL query using Supabase's SQL editor functionality
  async query<T = any>(query: string, params?: any[]): Promise<T[]> {
    // For now, we'll use a simple approach - get all users
    // In production, you might want to create a custom RPC function
    if (query.toLowerCase().includes('select * from users')) {
      const { data, error } = await this.supabase
        .from('users')
        .select('*');
      
      if (error) {
        throw new Error(`Supabase query error: ${error.message}`);
      }
      
      return data || [];
    }
    
    // For other queries, we'll need to implement specific methods
    throw new Error('Raw SQL queries not supported. Use specific Supabase methods.');
  }

  // Execute query and return first result
  async queryOne<T = any>(query: string, params?: any[]): Promise<T | null> {
    const results = await this.query<T>(query, params);
    return results[0] || null;
  }

  // User management methods using Supabase client
  async createUser(userData: {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'facilitator' | 'facility-manager' | 'admin';
    gender?: string;
    phone?: string;
    department?: string;
    experience?: number;
    specialization?: string;
    thumbnail?: string;
    email_verified_at?: string;
  }): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .upsert({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        gender: userData.gender,
        phone: userData.phone,
        department: userData.department,
        experience: userData.experience,
        specialization: userData.specialization,
        thumbnail: userData.thumbnail,
        email_verified_at: userData.email_verified_at,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create/update user: ${error.message}`);
    }

    return data;
  }

  async getUserById(id: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw new Error(`Failed to get user: ${error.message}`);
    }

    return data;
  }

  async getUserByEmail(email: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw new Error(`Failed to get user by email: ${error.message}`);
    }

    return data;
  }

  async updateUser(id: string, updates: Partial<{
    name: string;
    role: string;
    gender: string;
    thumbnail: string;
    email_verified_at: string;
  }>): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }

    return data;
  }

  async checkFacilitatorExists(email: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .in('role', ['facilitator', 'facility-manager', 'admin'])
      .limit(1);

    if (error) {
      throw new Error(`Failed to check facilitator: ${error.message}`);
    }

    return data && data.length > 0;
  }

  async createFacilitator(userData: {
    id: string;
    email: string;
    name: string;
    gender?: string;
    phone?: string;
    department?: string;
    experience?: number;
    specialization?: string;
    thumbnail?: string;
    email_verified_at?: string;
  }): Promise<any> {
    return await this.createUser({
      ...userData,
      role: 'facilitator'
    });
  }

  // Test connection
  async testConnection(): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .select('count')
        .limit(1);

      if (error) {
        return {
          success: false,
          message: `Connection test failed: ${error.message}`
        };
      }

      return {
        success: true,
        message: 'Supabase connection successful',
        data: { usersCount: data?.length || 0 }
      };
    } catch (error) {
      return {
        success: false,
        message: `Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

// Export singleton instance
export const supabaseService = SupabaseService.getInstance();
