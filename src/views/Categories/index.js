import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import api from '../../services/api';

import Loader from '../../assets/loader.gif';

import Styles from './index.module.css';

const Categories = (props) => {
  const [joke, setJoke] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    setIsLoad(true);

    api
      .get(`random?category=${category}`)
      .then((r) => {
        setJoke(r.data);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoad(false);
      });
  }, [category]);

  if (isLoad) {
    return (
      <div className="loader animeLeft">
        <img src={Loader} alt="loader" />
      </div>
    );
  }

  return (
    <main className={`animeLeft ${Styles.categoriesMain}`}>
      <h1>Category: {category}</h1>
      <div>
        <h3>{joke?.value}</h3>
      </div>
    </main>
  );
};

export default Categories;
