import { SurveysNewPage } from '../../components/pages/surveys/SurveysNewPage';
import { WithSidebarLayout } from '@components';
import { setLayout } from '@utils';

export default function _new() {
  return <SurveysNewPage />;
}

setLayout(_new, WithSidebarLayout);
