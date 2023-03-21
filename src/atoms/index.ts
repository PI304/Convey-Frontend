import { getDefaultStore } from 'jotai';

export const store = getDefaultStore();

export * from './authAtom';
export * from './surveysAtom';
export * from './formErrorsAtom';
