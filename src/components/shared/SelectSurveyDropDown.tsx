import { useQuery } from 'react-query';
import { getSurveys } from '@api';
import { SelectDropDown } from '@components';
import { QueryKeys } from '@constants';

export const SelectSurveyDropDown = ({ selectedSurveyId, onSelect, disabled }: SelectSurveyDropDownProps) => {
  const { data: surveys } = useQuery(QueryKeys.surveys, () => getSurveys(1));
  return <SelectDropDown label={selectedSurveyId} onSelect={onSelect} disabled={disabled} data={surveys || []} />;
};
