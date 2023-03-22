import { useMutation, useQuery } from 'react-query';
import {
  deletePackageFromWorkspace,
  deleteRoutineDetails,
  deleteRoutines,
  deleteWorkspace,
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
  /**
   * Workspaces
   */

  const _getWorkspaces = useQuery(QueryKeys.workspaces, getWorkspaces);

  const _postWorkspace = useMutation((params: Parameters<typeof postWorkspace>) => postWorkspace(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.workspaces]),
  });

  const _getWorkspaceById = (id: string | undefined) =>
    useQuery([QueryKeys.workspace, id], () => {
      if (id === undefined) return;
      return getWorkspaceById(+id);
    });

  const _deleteWorkspace = useMutation((params: Parameters<typeof deleteWorkspace>) => deleteWorkspace(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.workspaces]),
  });

  /**
   * Packages
   */

  const _postPackagesToWorkspace = useMutation(
    (params: Parameters<typeof postPackagesToWorkspace>) => postPackagesToWorkspace(...params),
    {
      onSuccess: () => queryClient.invalidateQueries([QueryKeys.workspace]),
    },
  );

  const _deletePackageFromWorkspace = useMutation(
    (params: Parameters<typeof deletePackageFromWorkspace>) => deletePackageFromWorkspace(...params),
    {
      onSuccess: () => queryClient.invalidateQueries([QueryKeys.workspace]),
    },
  );

  /**
   * Routines
   */

  const _getRoutines = (id: string | undefined) =>
    useQuery([QueryKeys.routines, id], () => {
      if (id === undefined) return;
      return getRoutines(+id);
    });

  const _postRoutines = useMutation((params: Parameters<typeof postRoutines>) => postRoutines(...params));

  const _deleteRoutines = useMutation((params: Parameters<typeof deleteRoutines>) => deleteRoutines(...params), {
    onSuccess: () => queryClient.resetQueries([QueryKeys.routines]),
  });

  /**
   * Routine Details
   */

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
    _deleteWorkspace,
    _postPackagesToWorkspace,
    _deletePackageFromWorkspace,
    _getRoutines,
    _postRoutines,
    _deleteRoutines,
    _postRoutineDetails,
    _deleteRoutineDetails,
  };
};
