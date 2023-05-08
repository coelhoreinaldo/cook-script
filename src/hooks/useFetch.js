import { useState } from 'react';

function useFetch() {
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchApi = async (API_URL) => {
    try {
      setIsFetching(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      setErrorMessage('404 not found');
    } finally {
      setIsFetching(false);
    }
  };

  return {
    isFetching,
    errorMessage,
    fetchApi,
  };
}

export default useFetch;
