import { useQueryString } from 'hooks/useQueryString';

export const SurveysViewPage = () => {
  const id = useQueryString('id');
  return <div>SurveysViewPage / {id}</div>;
};
