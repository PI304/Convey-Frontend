import { useMutation, useQuery } from 'react-query';
import {
  deletePackageFromWorkspace,
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
    _getRoutines,
    _postPackagesToWorkspace,
    _deletePackageFromWorkspace,
    _postRoutines,
    _postRoutineDetails,
    _deleteRoutineDetails,
  };
};
