import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Grid,
  GridItem,
  Container,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import Logo from '../../assets/logo.jpg';
import api from '../../services/api';
import Styles from './index.module.css';

const Header = () => {
  const [main, setMain] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('categories').then((res) => {
      setMain(res.data);
    });
  }, []);

  const handleCategory = (e) => {
    e.preventDefault();

    navigate(`/categories/${e.target.value}`);
  };

  return (
    <nav className={Styles.button}>
      <Container maxW="container.xl">
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colStart={1}>
            <Link to="/">
              <img src={Logo} alt="Logo" className="logo" />
            </Link>
          </GridItem>
          <GridItem colSpan={6} colEnd={12} h="150px">
            <Menu>
              <FormControl>
                <FormLabel>Select category</FormLabel>
                <Select onChange={handleCategory}>
                  {main?.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Menu>
          </GridItem>
        </Grid>
      </Container>
    </nav>
  );
};

export default Header;
