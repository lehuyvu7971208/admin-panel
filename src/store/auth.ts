import { defineStore } from 'pinia';

// Apis
import { signIn, SignInRequestData } from '@/api/auth';

type AuthState = {
  accessToken: string | null;
};

type AuthGetters = {};

type AuthActions = {
  signIn(data: SignInRequestData): Promise<string>

  signOut(): Promise<void>;
};

export const useAuthStore = defineStore<'auth', AuthState, AuthGetters, AuthActions>('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
  }),

  actions: {
    async signIn(data) {
      const response = await signIn({
        username: data.username,
        password: data.password,
      });

      this.accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', response.data.accessToken);

      return response.data.accessToken;
    },

    async signOut() {
      //
    }
  }
});