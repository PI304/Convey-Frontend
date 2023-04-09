import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import { getPackages } from '@api';
import { SelectDropDown } from '@components';
import { QueryKeys } from '@constants';

export const SelectPackageDropDown = ({ onSelect, label }: SelectPackageDropDownProps) => {
  const { data: packages } = useQuery(QueryKeys.packages, () => getPackages(1));
  return (
    <SelectDropDown
      label={label || '추가할 패키지를 선택하세요.'}
      onSelect={onSelect}
      disabled={false}
      data={packages?.results ?? []}
      forwardCss={css`
        width: 100%;
      `}
    />
  );
};
