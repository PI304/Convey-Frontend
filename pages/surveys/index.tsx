import { SurveysPage, WithSidebarLayout } from '@components';
import { setLayout } from '@utils/setLayout';

export default function index() {
  return <SurveysPage />;
}

setLayout(index, WithSidebarLayout);
