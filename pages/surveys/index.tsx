import { SurveysPage, WithSidebarLayout } from '@components';
import { setLayout } from '@utils';

export default function index() {
  return <SurveysPage />;
}

setLayout(index, WithSidebarLayout);
