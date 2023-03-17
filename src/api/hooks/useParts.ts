import { useMutation, useQuery } from 'react-query';
import { deletePart, getParts, postPart } from '@api';
import { QueryKeys } from '@constants';
import { queryClient } from '@pages/_app';

export const useParts = () => {
  const _getParts = (packageId: number) => useQuery([QueryKeys.parts, packageId], () => getParts(packageId));

  const _postPart = useMutation((params: Parameters<typeof postPart>) => postPart(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.parts]),
  });

  const _deletePart = useMutation((params: Parameters<typeof deletePart>) => deletePart(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.parts]),
  });

  return { _getParts, _postPart, _deletePart };
};
