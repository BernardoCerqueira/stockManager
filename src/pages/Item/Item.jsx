import { Link, useParams } from "react-router-dom"
import styles from "./Item.module.css"
import {database} from "../../database"
import deleteItem from "../../scripts/deleteItem.js"
import { useState } from "react"

export default function Item(){
    const {itemId} = useParams()

    const [items, setItems] = useState(() => {
        const db = localStorage.getItem("items-db")
        if(!db) return database
        return JSON.parse(db)
    })
    const removeItem = (id) => {
        setItems((cur) => (cur.filter(item => item.id != id)))
    }

    const item = items.find(el => String(el.id) === String(itemId))
    
    if(!item){
        return(
            <>
                <h1 style={{fontWeight: 200, marginBottom: "2rem"}}>Stock Items</h1>
                <h3>Item não encontrado ou excluído.</h3>
            </>
        ) 
    }

    const createdAt = item.createdAt
    const updatedAt = item.updatedAt
    const createDate = new Date(createdAt).toLocaleDateString("pt-BR")
    const updateDate = new Date(updatedAt).toLocaleDateString("pt-br") ?? ""


    return (
        <>
            <h1 style={{fontWeight: 200}}>Stock Items</h1>
            <div className={styles.nameDiv}>
                <section><h3>{item.name}</h3></section>
                <div className={styles.buttonsDiv}>
                    <Link to={`/updateItem/${itemId}`}>
                        <button
                            className={styles.attBtn}
                            >
                                Atualizar
                        </button>
                    </Link>
                    <button
                        className={styles.deleteBtn}
                        onClick={() => deleteItem(item.id, removeItem)}
                        >
                            Excluir
                    </button>
                </div>
            </div>
            <div className={styles.infoDiv}>
                <div>Categoria: {item.category}</div>
                <div>Quantidade em estoque: {item.inStock}</div>
                <div>Preço: R$ {item.price}</div>
            </div>
            <div>
                <p>{item.description}</p>
                <div className={styles.dateDiv}>
                    <p>Cadastrado em: {String(createDate)}</p>
                    <p>Atualizado em: {String(updateDate)}</p>
                </div>
            </div>
        </>

    )
}