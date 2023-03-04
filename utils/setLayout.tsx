import { ReactElement } from 'react';

export const setLayout = (
  targetPage: NextPageWithLayout,
  layout: ({ children }: ChildrenType) => ReactElement,
) => {
  targetPage.getLayout = (page: ReactElement) => {
    return layout({ children: page });
  };
};
