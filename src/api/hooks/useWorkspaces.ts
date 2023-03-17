import { useMutation, useQuery } from 'react-query';
import {
  deletePackageInWorkspace,
  deleteRoutineDetails,
  getRoutines,
  getWorkspaceById,
  getWorkspaces,
  postPackagesToWorkspace,
  postRoutineDetails,
  postRoutines,
  postWorkspace,
} from '@api';
import { QueryKeys } from '@constants';
import { queryClient } from '@pages/_app';

export const useWorkspaces = () => {
  const _getWorkspaces = useQuery(QueryKeys.workspaces, getWorkspaces);

  const _postWorkspace = useMutation((params: Parameters<typeof postWorkspace>) => postWorkspace(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.workspaces]),
  });

  const _getWorkspaceById = (id: string | undefined) =>
    useQuery([QueryKeys.workspace, id], () => {
      if (id === undefined) return;
      return getWorkspaceById(+id);
    });

  const _postPackagesToWorkspace = useMutation(
    (params: Parameters<typeof postPackagesToWorkspace>) => postPackagesToWorkspace(...params),
    {
      onSuccess: () => queryClient.invalidateQueries([QueryKeys.workspace]),
    },
  );

  const _deletePackageInWorkspace = useMutation(
    (params: Parameters<typeof deletePackageInWorkspace>) => deletePackageInWorkspace(...params),
    {
      onSuccess: () => queryClient.invalidateQueries([QueryKeys.workspace]),
    },
  );

  const _getRoutines = (id: string | undefined) =>
    useQuery([QueryKeys.routines, id], () => {
      if (id === undefined) return;
      return getRoutines(+id);
    });

  const _postRoutines = useMutation((params: Parameters<typeof postRoutines>) => postRoutines(...params));

  const _postRoutineDetails = useMutation(
    (params: Parameters<typeof postRoutineDetails>) => postRoutineDetails(...params),
    {
      onSuccess: () => queryClient.invalidateQueries([QueryKeys.routines]),
    },
  );

  const _deleteRoutineDetails = useMutation(
    (params: Parameters<typeof deleteRoutineDetails>) => deleteRoutineDetails(...params),
    {
      onSuccess: () => queryClient.invalidateQueries([QueryKeys.routines]),
    },
  );

  return {
    _getWorkspaces,
    _postWorkspace,
    _getWorkspaceById,
    _getRoutines,
    _postPackagesToWorkspace,
    _deletePackageInWorkspace,
    _postRoutines,
    _postRoutineDetails,
    _deleteRoutineDetails,
  };
};
