import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  };

  useEffect(() => {
    const query = Object.fromEntries([...searchParams.entries()]);
    const queryString = new URLSearchParams(query).toString();
    const fullURL = `${API_URL}?${queryString}`;
    fetchData(fullURL);
  }, [searchParams]);

  const dataValue = useMemo(
    () => ({
      characters,
      isFetching,
      isError,
      info,
      searchParams,
      setSearchParams
    }),
    [characters, isFetching, isError, info, searchParams, setSearchParams]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
