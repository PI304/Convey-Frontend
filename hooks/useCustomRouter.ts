import { useRouter } from 'next/router';

export const useCustomRouter = () => {
  const router = useRouter();
  const onRouteToPath = (path: string) => router.push(path);
  return { onRouteToPath };
};
