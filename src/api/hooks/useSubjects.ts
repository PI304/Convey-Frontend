import { useMutation, useQuery } from 'react-query';
import { deleteSubject, getIncludedSurveys, getSubjects, postSubject, putIncludedSurveys } from '@api';
import { QueryKeys } from '@constants';
import { queryClient } from '@pages/_app';

export const useSubjects = () => {
  const _getSubjects = (partId: number) => useQuery([QueryKeys.subjects, partId], () => getSubjects(partId));

  const _postSubject = useMutation((params: Parameters<typeof postSubject>) => postSubject(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.subjects]),
  });

  const _deleteSubject = useMutation((params: Parameters<typeof deleteSubject>) => deleteSubject(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.subjects]),
  });

  const _getIncludedSurveys = (subjectId: number) =>
    useQuery([QueryKeys.includedSurveys, subjectId], () => getIncludedSurveys(subjectId));

  const _putIncludedSurveys = useMutation(
    (params: Parameters<typeof putIncludedSurveys>) => putIncludedSurveys(...params),
    {
      onSuccess: () => queryClient.invalidateQueries([QueryKeys.includedSurveys]),
    },
  );

  return { _getSubjects, _postSubject, _deleteSubject, _putIncludedSurveys, _getIncludedSurveys };
};
