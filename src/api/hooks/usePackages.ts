import { useMutation, useQuery } from 'react-query';
import {
  deletePackage,
  deletePart,
  deleteSubject,
  getIncludedSurveys,
  getPackageById,
  getPackages,
  getParts,
  getSubjects,
  patchPackage,
  postPackage,
  postPart,
  postSubject,
  putIncludedSurveys,
} from '@api';
import { QueryKeys } from '@constants';
import { queryClient } from '@pages/_app';

export const usePackages = () => {
  /**
   * Packages
   */

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

  const _deletePackage = useMutation((params: Parameters<typeof deletePackage>) => deletePackage(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.packages]),
  });

  /**
   * Parts
   */

  const _getParts = (packageId: number) => useQuery([QueryKeys.parts, packageId], () => getParts(packageId));

  const _postPart = useMutation((params: Parameters<typeof postPart>) => postPart(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.parts]),
  });

  const _deletePart = useMutation((params: Parameters<typeof deletePart>) => deletePart(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.parts]),
  });

  /**
   * Subjects
   */

  const _getSubjects = (partId: number) => useQuery([QueryKeys.subjects, partId], () => getSubjects(partId));

  const _postSubject = useMutation((params: Parameters<typeof postSubject>) => postSubject(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.subjects]),
  });

  const _deleteSubject = useMutation((params: Parameters<typeof deleteSubject>) => deleteSubject(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.subjects]),
  });

  /**
   * Included Surveys
   */

  const _getIncludedSurveys = (subjectId: number) =>
    useQuery([QueryKeys.includedSurveys, subjectId], () => getIncludedSurveys(subjectId));

  const _putIncludedSurveys = useMutation(
    (params: Parameters<typeof putIncludedSurveys>) => putIncludedSurveys(...params),
    {
      onSuccess: () => queryClient.invalidateQueries([QueryKeys.includedSurveys]),
    },
  );

  return {
    _getPackages,
    _postPackages,
    _patchPackages,
    _getPackagesById,
    _deletePackage,
    _getParts,
    _postPart,
    _deletePart,
    _getSubjects,
    _postSubject,
    _deleteSubject,
    _putIncludedSurveys,
    _getIncludedSurveys,
  };
};
