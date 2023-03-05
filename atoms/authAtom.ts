import { atom } from 'jotai';

export const authAtom = atom<ResponseAuth.PostLogin | null, ResponseAuth.PostLogin[], void>(
  null,
  (_get, set, update: ResponseAuth.PostLogin) => {
    set(authAtom, { accessToken: update.accessToken });
  },
);
