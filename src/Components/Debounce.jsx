import React, { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
  const [dQuery, setDQuery] = useState(value);

  useEffect(() => {
    const clickHandler = setTimeout(() => {
      setDQuery(value);
    }, delay);

    return () => {
      clearTimeout(clickHandler);
    };
  }, [value, delay]);

  return dQuery;
}
