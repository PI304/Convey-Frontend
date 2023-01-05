const BreakPoints = {
  general: '1200px',
} as const;

export const Devices = {
  mobile: `@media (max-width: ${BreakPoints.general})`,
  desktop: `@media (min-width: ${BreakPoints.general})`,
} as const;

export const BreakPointsInNumber = {
  general: +BreakPoints.general.replace(/[a-z]/g, ''),
} as const;
