import { SurveysViewPage, WithSidebarLayout } from '@components';
import { setLayout } from '@utils/setLayout';

export default function index() {
  return <SurveysViewPage />;
}

setLayout(index, WithSidebarLayout);
