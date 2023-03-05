import { useRouter } from 'next/router';

export const useCustomRouter = () => {
  const router = useRouter();
  const routeToPath = (path: string) => router.push(path);
  const getPathname = () => router.pathname;
  return { routeToPath, getPathname };
};
