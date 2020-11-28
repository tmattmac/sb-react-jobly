import React, { useEffect, useState } from 'react';

const useLocalStorage = (key, asJSON = true) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = localStorage.getItem(key) || null;
    asJSON ? setValue(JSON.parse(result)) : setValue(result);
    setLoading(false);
  }, [key]);

  useEffect(() => {
    asJSON ?
      localStorage.setItem(key, JSON.stringify(value || null))
      :
      localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue, loading];
}

export default useLocalStorage;