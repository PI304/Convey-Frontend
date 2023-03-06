import { useAtomValue } from 'jotai';
import { SurveyBox } from '../../shared/SurveyBox';
import { surveysAtom } from '@atoms';
import { useQueryString } from '@hooks/useQueryString';

export const SurveysViewPage = () => {
  const id = useQueryString('id');
  const surveys = useAtomValue(surveysAtom);

  return (
    <div>
      <h1>SurveysViewPage / {id}</h1>
      {surveys?.map((survey, i) => (
        <SurveyBox survey={survey} surveyIdx={i} key={i} />
      ))}
    </div>
  );
};
