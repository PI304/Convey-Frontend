/* eslint-disable @typescript-eslint/no-empty-function */
import { getDefaultStore } from 'jotai';
import { authAtom } from './authAtom';

export const store = getDefaultStore();
export const unsub = store.sub(authAtom, () => {});

export * from './authAtom';
