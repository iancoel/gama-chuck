import React, { useEffect, useState } from 'react';
import { FormLabel, Input, Button } from '@chakra-ui/react';
import api from '../../services/api';
import Loader from '../../assets/loader.gif';

const App = () => {
  const [data, setData] = useState({});
  const [allJokes, setAllJokes] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchJoke, setSearchJoke] = useState('');

  useEffect(() => {
    setIsLoad(true);
    api
      .get('random')
      .then((response) => setData(response.data))
      .catch((e) => console.error(e))
      .finally(() =>
        setTimeout(() => {
          setIsLoad(false);
        }, 2500),
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoad(true);
    api
      .get(`search?query=${searchJoke}`)
      .then((r) => {
        setIsSearch(true);
        setAllJokes(r.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoad(false));
  };

  if (isLoad) {
    return (
      <div className="loader">
        <img src={Loader} alt="Loader" />
      </div>
    );
  }

  return (
    <div className="home-component">
      <h1>Joke</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <FormLabel>Search jokes</FormLabel>
          <Input type="text" onChange={(e) => setSearchJoke(e.target.value)} />
          <Button type="submit">Search</Button>
        </form>
      </div>

      {!isSearch ? (
        <div className="jokes">
          <img alt={data?.icon_url} src={data?.icon_url} />
          <h3>{data?.value}</h3>
        </div>
      ) : (
        <>
          {allJokes?.result.map((item, index) => (
            <div className="jokes" key={index}>
              <img alt={item?.icon_url} src={item?.icon_url}></img>
              <h3>{item?.value}</h3>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
