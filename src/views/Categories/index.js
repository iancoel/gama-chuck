import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import api from '../../services/api';

import Loader from '../../assets/loader.gif';

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
      <div>
        <img src={Loader} alt="loader" />
      </div>
    );
  }

  return (
    <>
      <h1>Categories</h1>
      <div>
        <img src={joke?.icon_url} alt={joke?.value} />
        <h4>{joke?.value}</h4>
      </div>
    </>
  );
};

export default Categories;
