import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export const useUniqueId = () => {
  const [id, setId] = useState('');

  useEffect(() => {
    setId(uuid());
  }, []);

  return id;
};
