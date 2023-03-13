import { WithSidebarLayout, WorkspacesViewPage } from '@components';
import { setLayout } from '@utils/setLayout';

export default function index() {
  return <WorkspacesViewPage />;
}

setLayout(index, WithSidebarLayout);
