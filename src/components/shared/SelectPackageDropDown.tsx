import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import { getPackages } from '@api';
import { SelectDropDown } from '@components';
import { QueryKeys } from '@constants';

export const SelectPackageDropDown = ({ onSelect }: SelectPackageDropDownProps) => {
  const { data: packages } = useQuery(QueryKeys.packages, getPackages);
  return (
    <SelectDropDown
      label='추가할 패키지를 선택하세요.'
      onSelect={onSelect}
      disabled={false}
      data={packages || []}
      forwardCss={css`
        width: 100%;
      `}
    />
  );
};
