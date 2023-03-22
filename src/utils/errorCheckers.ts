/**
 * Error - return true
 * No Error - return false
 */

export const requireContentAndMinLength = (value: string, minLength: number) => {
  if (value === '') return true;
  if (value.length < minLength) return true;
  else return false;
};

export const requireAtLeastOneSubstitute = (choice: ChoiceType) => {
  if (choice.descForm === null) return false;
  if (/(%d|%s)/g.test(choice.descForm)) return false;
  else return true;
};
