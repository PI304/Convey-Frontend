export const parseDescForm = (descForm: string) => {
  return descForm.replaceAll(/%d/g, '(숫자)').replaceAll(/%s/g, '(문자)');
};
