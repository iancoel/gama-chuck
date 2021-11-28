import React, { useEffect, useState } from 'react';
import { FormLabel, Input, Button } from '@chakra-ui/react';
import api from '../../services/api';
import Loader from '../../assets/loader.gif';
import Styles from './index.module.css';

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
      <div className="loader animeLeft">
        <img src={Loader} alt="Loader" />
      </div>
    );
  }

  return (
    <div className="home-component">
      <form onSubmit={handleSubmit} className={Styles.form}>
        <FormLabel className={Styles.label}>Search jokes</FormLabel>
        <Input type="text" onChange={(e) => setSearchJoke(e.target.value)} />
        <Button type="submit" className={Styles.button} variant="outline">
          Search
        </Button>
      </form>

      {!isSearch ? (
        <main className={Styles.mainSingleJoke}>
          <div className="jokes animeLeft">
            <h3>{data?.value}</h3>
          </div>
        </main>
      ) : (
        <main className={Styles.main}>
          {allJokes?.result.map((item, index) => (
            <div className="jokes animeLeft" key={index}>
              <h3>{item?.value}</h3>
            </div>
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
