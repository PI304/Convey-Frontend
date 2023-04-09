import { css } from '@emotion/react';
import { Button } from '@components';
import { useCustomRouter } from '@hooks/useCustomRouter';
import { withoutPropagation } from '@utils/withoutPropagation';

export const Board = ({ heads, bodies, viewPath, onDelete }: BoardProps) => {
  const { routeToPath } = useCustomRouter();
  return (
    <table css={Table}>
      <thead>
        <tr>
          {heads?.map((head, i) => (
            <th key={i}>{head}</th>
          ))}
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {bodies?.map((data, i) => (
          <tr key={i} onClick={() => routeToPath(viewPath + '/' + data[0])}>
            {data?.map((data, i) => (
              <td key={i}>{data}</td>
            ))}
            <td>
              <Button
                label='삭제'
                onClick={(e) => withoutPropagation(e, () => onDelete([data[0]]))}
                backgroundColor='lightCoral'
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Table = css`
  text-align: center;
  width: 90rem;

  tr {
    cursor: pointer;
  }

  th,
  td {
    padding: 1rem 3rem;
    border-bottom: 0.1rem solid black;

    > button {
      margin: 0 auto;
    }
  }
`;
