// API service functions for Inpulse integration

export interface InpulseUserDetails {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  email_verified_at: string;
  thumbnail: string;
}

export interface InpulseInterest {
  id: string;
  interest: string;
  sub_interests: {
    id: string;
    name: string;
  }[];
}

export interface InpulseApiResponse<T> {
  status: string;
  message: string;
  data: T;
  error: null | string;
}

class InpulseApiService {
  private baseUrl = 'https://api.inpulse.education';
  private tenantId = 'eb9d49bb-bdb9-43c0-9741-febeeca7224a';

  async signIn(email: string, password: string): Promise<{ status: string; message: string; data: { token: string }; error: null | string }> {
    const response = await fetch(`${this.baseUrl}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  }

  async getUserDetails(token: string): Promise<InpulseUserDetails> {
    const response = await fetch(`${this.baseUrl}/t/${this.tenantId}/users/details`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const data: InpulseApiResponse<InpulseUserDetails> = await response.json();
    
    // Check if the response indicates "record not found"
    if (data.status === 'error' && data.message && data.message.includes('record not found')) {
      throw new Error('record not found');
    }
    
    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to fetch user details');
    }
    
    return data.data;
  }

  async getUserInterests(token: string, userId: string): Promise<InpulseInterest[]> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/interests`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user interests');
    }

    const data: InpulseApiResponse<InpulseInterest[]> = await response.json();
    return data.data;
  }

  async syncUserToDatabase(userData: InpulseUserDetails, interests: InpulseInterest[], role: 'student' | 'facilitator' | 'facility-manager' | 'admin' = 'student') {
    try {
      const response = await fetch('/api/internal/users/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            gender: userData.gender,
            thumbnail: userData.thumbnail,
            email_verified_at: userData.email_verified_at,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync user to database');
      }

      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(result.message || 'Failed to sync user');
      }

      return {
        user: result.data.user,
        interests: interests, // Keep interests from Inpulse API
        isNew: result.data.isNew,
        role: result.data.role
      };
    } catch (error) {
      console.error('Error syncing user to database:', error);
      throw error;
    }
  }

  async checkFacilitatorProfile(email: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/internal/users/facilitator?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        // If we get a 404 or similar error, it means the facilitator doesn't exist
        if (response.status === 404) {
          return false;
        }
        throw new Error('Failed to check facilitator profile');
      }

      const result = await response.json();
      
      if (result.status !== 'success') {
        // If the API returns an error status, check if it's a "record not found" type error
        if (result.message && result.message.includes('record not found')) {
          return false;
        }
        throw new Error(result.message || 'Failed to check facilitator');
      }

      return result.data.exists;
    } catch (error) {
      console.error('Error checking facilitator profile:', error);
      // If there's any error, assume facilitator doesn't exist
      return false;
    }
  }

  async createFacilitatorProfile(userData: InpulseUserDetails): Promise<any> {
    try {
      const response = await fetch('/api/internal/users/facilitator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            gender: userData.gender,
            thumbnail: userData.thumbnail,
            email_verified_at: userData.email_verified_at,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create facilitator profile');
      }

      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(result.message || 'Failed to create facilitator');
      }

      return result.data.user;
    } catch (error) {
      console.error('Error creating facilitator profile:', error);
      throw error;
    }
  }
}

export const inpulseApiService = new InpulseApiService();
