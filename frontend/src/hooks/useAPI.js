import { useEffect, useState } from 'react';
import JoblyAPI from '../api/JoblyAPI';

const useAPI = (method, ...args) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    try {
      setLoading(true);
      const response = await JoblyAPI[method](...args);
      setData(response);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [...args]);
  
  return [data, loading, error, fetchData];
}

export default useAPI;