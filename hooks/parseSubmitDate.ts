export const parseSubmitDate = (submitDate: string) => {
  return submitDate.split('T')[0].split('-').join('. ');
};
