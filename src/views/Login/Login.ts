// Utilities
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Store
import { useAuthStore } from '@/store/auth';

export const useLoginContext = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  const username = ref<string>('');
  const password = ref<string>('');

  const signIn = async () => {
    await authStore.signIn({
      username: username.value,
      password: password.value
    });

    router.push({ name: 'home' });
  };

  return {
    username,
    password,

    signIn,
  };
};

