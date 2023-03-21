import { atom } from 'jotai';

export const formErrorsAtom = atom<string[]>([]);

export const addFormErrorAtom = atom(null, (get, set, update: AddFormErrorAtomType) => {
  const formErrors = get(formErrorsAtom);
  if (formErrors.includes(update.formId)) return;
  set(formErrorsAtom, [...formErrors, update.formId]);
});

export const removeFormErrorAtom = atom(null, (get, set, update: RemoveFormErrorAtomType) => {
  const formErrors = get(formErrorsAtom);
  if (!formErrors.includes(update.formId)) return;
  set(
    formErrorsAtom,
    formErrors.filter((formId) => formId !== update.formId),
  );
});
