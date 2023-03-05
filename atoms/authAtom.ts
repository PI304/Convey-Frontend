import { atom } from 'jotai';

export const authAtom = atom<ResponseAuth.Login | null, ResponseAuth.Login[], void>(
  null,
  (_get, set, update: ResponseAuth.Login) => {
    set(authAtom, { accessToken: update.accessToken });
  },
);
