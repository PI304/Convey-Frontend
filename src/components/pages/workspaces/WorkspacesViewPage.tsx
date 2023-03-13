import { useQueryString } from '@hooks/useQueryString';

export const WorkspacesViewPage = () => {
  const id = useQueryString('id');
  return <div>WorkspacesViewPage | {id}</div>;
};
