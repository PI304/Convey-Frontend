/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { authAtom } from '@atoms';
import { Paths, PublicPathRegex, StorageKeys } from '@constants';
import { useCustomRouter } from '@hooks/useCustomRouter';

export const RouterGuard = ({ children }: ChildrenType) => {
  const [auth, setAuth] = useAtom(authAtom);
  const [isRenderPermitted, setIsRenderPermitted] = useState(false);
  const { routeToPath, getPathname } = useCustomRouter();

  const routeToWorkspace = () => routeToPath(Paths.workspaces);
  const routeToLogin = () => routeToPath(Paths.login);
  const checkIsPublicPath = () => PublicPathRegex.test(getPathname());
  const checkIsAuthed = () => !!auth;

  const restoreAuthData = () => {
    const accessToken = sessionStorage.getItem(StorageKeys.accessToken);
    if (accessToken) setAuth({ accessToken });
    else decideWhetherToRender();
  };

  const decideWhetherToRender = () => {
    if (checkIsPublicPath() === !checkIsAuthed()) setIsRenderPermitted(true);
    else redirectToProperPath();
  };

  const redirectToProperPath = () => {
    if (checkIsAuthed()) routeToWorkspace();
    else routeToLogin();
  };

  useEffect(() => {
    if (!checkIsAuthed()) restoreAuthData();
    else decideWhetherToRender();
  }, [getPathname(), auth]);

  return <>{isRenderPermitted && children}</>;
};
