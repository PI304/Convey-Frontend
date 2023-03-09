import { DefaultLayout, LoginPage } from '@components';
import { setLayout } from '@utils/setLayout';

export default function index() {
  return <LoginPage />;
}

setLayout(index, DefaultLayout);
