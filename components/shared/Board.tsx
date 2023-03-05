import { css } from '@emotion/react';
import { useCustomRouter } from '@hooks/useCustomRouter';

export const Board = ({ heads, bodies, viewPath }: BoardProps) => {
  const { onRouteToPath } = useCustomRouter();
  return (
    <table css={Table}>
      <thead>
        <tr>
          {heads?.map((head, i) => (
            <th key={i}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodies?.map((data, i) => (
          <tr key={i} onClick={() => onRouteToPath(viewPath + '/' + data[0])}>
            {data?.map((data, i) => (
              <td key={i}>{data}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Table = css`
  text-align: center;

  tr {
    cursor: pointer;
  }

  th,
  td {
    padding: 1rem 3rem;
    border-bottom: 0.1rem solid black;
  }
`;
