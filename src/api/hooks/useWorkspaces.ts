import { useMutation, useQuery } from 'react-query';
import { getWorkspaceById, getWorkspaces, postWorkspace } from '@api';
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

  return { _getWorkspaces, _postWorkspace, _getWorkspaceById };
};
