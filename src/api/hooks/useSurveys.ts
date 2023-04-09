import { useSetAtom } from 'jotai';
import { useMutation, useQuery } from 'react-query';
import { deleteSurveys, getSurveys, getSurveysById, patchSurveys, postSurveys, putSurveys } from '@api';
import { setSurveysFromServerDataAtom } from '@atoms';
import { QueryKeys } from '@constants';
import { queryClient } from '@pages/_app';

export const useSurveys = () => {
  const setSurveysFromServerData = useSetAtom(setSurveysFromServerDataAtom);

  const _getSurveys = (id: number) => useQuery([QueryKeys.surveys, id], () => getSurveys(id));

  const _postSurveys = useMutation((params: Parameters<typeof postSurveys>) => postSurveys(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.surveys]),
  });

  const _patchSurveys = useMutation((params: Parameters<typeof patchSurveys>) => patchSurveys(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.survey]),
  });

  const _putSurveys = useMutation((params: Parameters<typeof putSurveys>) => putSurveys(...params), {
    onSuccess: () => alert('서베이 구성을 저장했습니다.'),
  });

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

  const _deleteSurveys = useMutation((params: Parameters<typeof deleteSurveys>) => deleteSurveys(...params), {
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.surveys]),
  });

  return { _getSurveys, _postSurveys, _patchSurveys, _putSurveys, _getSurveysById, _deleteSurveys };
};
