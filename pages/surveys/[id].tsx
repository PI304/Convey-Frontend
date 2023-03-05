import { SurveysViewPage, WithSidebarLayout } from '@components';
import { setLayout } from '@utils';

export default function index() {
  return <SurveysViewPage />;
}

setLayout(index, WithSidebarLayout);
