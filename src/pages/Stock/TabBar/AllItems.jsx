import { Link } from "react-router-dom"
import styles from "../Stock.module.css"
import deleteItem from "../../../scripts/deleteItem.js"
import PropTypes from "prop-types"

AllItems.propTypes = {
    db: PropTypes.arrayOf(PropTypes.object)
}

export default function AllItems({db, removeItem}){
    return(
        <div className={styles.tablesDiv}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Nome</td>
                        <td>Em Estoque</td>
                        <td>Categoria</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {db.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.inStock}</td>
                            <td>{item.category}</td>
                            <td className={styles.buttonsTd}>
                                <Link to={`/item/${item.id}`}>
                                    <button
                                        style={{backgroundColor: "lightblue"}}>
                                            Ver
                                    </button>
                                </Link>
                                <Link to={`/updateItem/${item.id}`}>
                                    <button
                                        style={{backgroundColor: "white"}}>
                                            Atualizar
                                    </button>
                                </Link>
                                <button
                                    style={{backgroundColor: "rgb(255,83,89)"}}
                                    onClick={() => deleteItem(item.id, removeItem)}>
                                        Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}