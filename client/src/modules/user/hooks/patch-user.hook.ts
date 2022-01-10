import { useCustomToast } from 'modules/app/hooks/custom-toast.hook';
import jsonpatch from 'fast-json-patch';
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { queryKeys } from 'utilities/data/constants/react-query.constants';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../utilities/services/axios.service';
import { useUser } from './user.hook';

async function patchUserOnServer(
  newData: User | null,
  originalData: User | null,
 ): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    },
  );
  return data.user;
 }

export function usePatchUser(): 
  UseMutateFunction<User, unknown, User, unknown> {
  const queryClient = useQueryClient();
  const { user, updateUser } = useUser();
  const toast = useCustomToast();
  
  // Optimistic updates
  const { mutate } = useMutation((newUser: User | null) => {
    return patchUserOnServer(newUser, user);
  }, {
    onMutate: async (newUser: User | null) => {
      queryClient.cancelQueries(queryKeys.user);
      const previousUser = queryClient.getQueryData<User>(queryKeys.user);
      updateUser(newUser);

      return previousUser;
    },
    onError: (_error, _newUser, previousUser) => {
      if (!previousUser)
        return;

      updateUser(previousUser);

      toast({
        title: 'Update failed! Rolling back previous settings.',
        status: 'error'
      });
    },
    onSuccess: (response: User | null) => {
      if (!response)
        return;

      toast({
        title: 'User updated!',
        status: 'success'
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.user);
    }
  });

  return mutate;
}
