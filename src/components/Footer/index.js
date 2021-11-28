import Styles from './index.module.css';
import logoMeliuz from '../../assets/logo-meliuz.png';

const Footer = () => {
  return (
    <footer className="footer animeLeftFooter">
      <div className={Styles.logoMeliuz}>
        <img src={logoMeliuz} alt="Logo Méliuz" />
      </div>
    </footer>
  );
};

export default Footer;
