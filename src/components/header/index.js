import styles from './header.module.css';
import { Link } from 'react-router-dom';

function Header() {
    return(
       <header>
          
            <Link className={styles.logo} to="/">Prime Flix</Link>
           
            <Link className={styles.favoritos} to="/favoritos">Meus Filmes</Link>
       </header>
    )
}

export default Header;