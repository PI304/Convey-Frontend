import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useUniqueId } from './useUniqueId';
import { formErrorsAtom, addFormErrorAtom, removeFormErrorAtom } from '@atoms';

export const useFormError = (value: string, isOptional: boolean, errorChecker?: () => boolean) => {
  const id = useUniqueId();
  const formErrors = useAtomValue(formErrorsAtom);
  const addFormError = useSetAtom(addFormErrorAtom);
  const removeFormError = useSetAtom(removeFormErrorAtom);

  const validate = () => {
    if (!id) return;
    if (errorChecker) {
      if (errorChecker()) addFormError({ formId: id });
      else removeFormError({ formId: id });
    }
    if (!errorChecker) {
      if (value === '') addFormError({ formId: id });
      else removeFormError({ formId: id });
    }
  };

  const checkIsError = () => formErrors.includes(id);

  useEffect(() => {
    if (!isOptional) validate();
    return () => removeFormError({ formId: id });
  }, [value, id]);

  return { checkIsError };
};
