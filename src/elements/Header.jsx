import { Link } from "react-router-dom";
import PropTypes from "prop-types";

Header.propTypes = {
    styles: PropTypes.objectOf(PropTypes.string)
}

export default function Header({styles}){
    return(
        <header>
            <nav className={styles.nav}>
                <Link to="/">
                    <h1>REACT STOCK</h1>
                </Link>
                <div className={styles.buttonDiv}>
                    <Link to="/"><button>Início</button></Link>
                    <Link to="/items"><button>Itens</button></Link>
                </div>
            </nav>
        </header>
    )
}