import { DefaultLayout, LoginPage } from '@components';
import { setLayout } from '@utils';

export default function index() {
  return <LoginPage />;
}

setLayout(index, DefaultLayout);
