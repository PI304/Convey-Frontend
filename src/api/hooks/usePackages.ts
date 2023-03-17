import { useMutation, useQuery } from 'react-query';
import { getPackageById, getPackages, patchPackage, postPackage } from '@api';
import { QueryKeys } from '@constants';
import { queryClient } from '@pages/_app';

export const usePackages = () => {
  const _getPackages = useQuery(QueryKeys.packages, getPackages);

  const _postPackages = useMutation((params: Parameters<typeof postPackage>) => postPackage(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.packages]),
  });

  const _patchPackages = useMutation((params: Parameters<typeof patchPackage>) => patchPackage(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.package]),
  });

  const _getPackagesById = (id: string | undefined) =>
    useQuery([QueryKeys.package, id], () => {
      if (id === undefined) return;
      return getPackageById(+id);
    });

  return { _getPackages, _postPackages, _patchPackages, _getPackagesById };
};
