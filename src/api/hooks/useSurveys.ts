import { useSetAtom } from 'jotai';
import { useMutation, useQuery } from 'react-query';
import { getSurveys, getSurveysById, patchSurveys, postSurveys, putSurveys } from '@api';
import { setSurveysFromServerDataAtom } from '@atoms';
import { QueryKeys } from '@constants';
import { queryClient } from '@pages/_app';

export const useSurveys = () => {
  const setSurveysFromServerData = useSetAtom(setSurveysFromServerDataAtom);

  const _getSurveys = useQuery(QueryKeys.surveys, () => getSurveys(1));

  const _postSurveys = useMutation((params: Parameters<typeof postSurveys>) => postSurveys(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.surveys]),
  });

  const _patchSurveys = useMutation((params: Parameters<typeof patchSurveys>) => patchSurveys(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.survey]),
  });

  const _putSurveys = useMutation((params: Parameters<typeof putSurveys>) => putSurveys(...params));

  const _getSurveysById = (id: string | undefined) =>
    useQuery(
      [QueryKeys.survey, id],
      () => {
        if (id === undefined) return;
        return getSurveysById(+id);
      },
      {
        onSuccess: (data) => {
          if (!data) return;
          setSurveysFromServerData({ surveys: data.sectors });
        },
        refetchOnWindowFocus: false,
      },
    );

  return { _getSurveys, _postSurveys, _patchSurveys, _putSurveys, _getSurveysById };
};
