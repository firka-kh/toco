import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Mock user data
          const mockUser: User = {
            id: '1',
            email,
            name: 'Ахмад Алиев',
            role: 'jobseeker',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            profile: {
              phone: '+992 90 123 45 67',
              location: 'Душанбе, Таджикистан',
              bio: 'Опытный разработчик программного обеспечения',
            },
            preferences: {
              language: 'rus',
              notifications: {
                email: true,
                sms: false,
                push: true,
              },
            },
            createdAt: new Date(),
            isVerified: true,
          };

          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      register: async (userData: Partial<User>) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const newUser: User = {
            id: Date.now().toString(),
            email: userData.email!,
            name: userData.name!,
            role: userData.role || 'jobseeker',
            profile: userData.profile || {},
            preferences: {
              language: 'rus',
              notifications: {
                email: true,
                sms: false,
                push: true,
              },
            },
            createdAt: new Date(),
            isVerified: false,
          };

          set({ user: newUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updateProfile: async (userData: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        set({ isLoading: true });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          const updatedUser = { ...user, ...userData };
          set({ user: updatedUser, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
