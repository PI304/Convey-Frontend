import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useUniqueId } from './useUniqueId';
import { formErrorsAtom, addFormErrorAtom, removeFormErrorAtom } from '@atoms';

export const useFormError = (value: string, isOptional: boolean, errorCondition?: () => boolean) => {
  const id = useUniqueId();
  const formErrors = useAtomValue(formErrorsAtom);
  const addFormError = useSetAtom(addFormErrorAtom);
  const removeFormError = useSetAtom(removeFormErrorAtom);

  const validate = () => {
    if (!id) return;
    if (errorCondition) {
      if (errorCondition()) addFormError({ formId: id });
      else removeFormError({ formId: id });
    }
    if (!errorCondition) {
      if (value === '') addFormError({ formId: id });
      else removeFormError({ formId: id });
    }
  };

  const checkIsError = () => formErrors.includes(id);

  useEffect(() => {
    if (!isOptional) validate();
    return () => removeFormError({ formId: id });
  }, [value]);

  return { checkIsError };
};
