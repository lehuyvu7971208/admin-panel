// Utilities
import { ref } from 'vue';

// Apis
import { findAll, User } from '@/api/users';

export const useUsersContext = () => {
  const users = ref<Array<User>>([]);

  const loadUsers = async () => {
    const response = await findAll();

    users.value = response.data.users;
  };

  return { users, loadUsers };
};