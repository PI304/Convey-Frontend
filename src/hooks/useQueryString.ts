import { useRouter } from 'next/router';

export const useQueryString = (key: string) => {
  const router = useRouter();
  return router.query[key] ? router.query[key] + '' : undefined;
};
