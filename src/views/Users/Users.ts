// Utilities
import { ref } from 'vue';

// Apis
import { findAllUsers, User } from '@/api/users';

export const useUsersContext = () => {
  const users = ref<Array<User>>([]);

  const loadUsers = async () => {
    const response = await findAllUsers();

    users.value = response.data.users;
  };

  return { users, loadUsers };
};