import { SurveysNewPage, WithSidebarLayout } from '@components';
import { setLayout } from '@utils/setLayout';

export default function _new() {
  return <SurveysNewPage />;
}

setLayout(_new, WithSidebarLayout);
