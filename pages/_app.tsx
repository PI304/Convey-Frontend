/* eslint-disable no-restricted-syntax */
import { Global } from '@emotion/react';
import { Provider } from 'jotai';
import { useAtomsDevtools } from 'jotai-devtools';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { store } from '@atoms';
import { RouterGuard } from '@components';
import { GlobalStyle } from '@styles';

const queryClient = new QueryClient();

const AtomsDevtools = ({ children }: ChildrenType) => {
  useAtomsDevtools('store');
  return children;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <AtomsDevtools>
      <Provider store={store}>
        <RouterGuard>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Global styles={GlobalStyle} />
            {getLayout(<Component {...pageProps} />)}
          </QueryClientProvider>
        </RouterGuard>
      </Provider>
    </AtomsDevtools>
  );
}
