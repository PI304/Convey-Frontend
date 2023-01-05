import { useState } from 'react';

export const useSwitch = (initialState = false): [boolean, () => void, () => void, () => void] => {
  const [isActive, setIsActive] = useState(initialState);
  const onTurnOn = () => setIsActive(true);
  const onTurnOff = () => setIsActive(false);
  const onToggle = () => setIsActive(!isActive);
  return [isActive, onTurnOn, onTurnOff, onToggle];
};
