import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { database, updateItemInDatabase } from "../../database"
import styles from "../Stock/Stock.module.css"

export default function UpdateItem(){
    const {itemId} = useParams()
    const [items, setItems] = useState(() => {
        const db = localStorage.getItem("items-db")
        if(!db) return database
        return JSON.parse(db)
    })
    const item = items.find((el) => el.id == itemId)

    const [name, setName] = useState(item.name)
    const [inStock, setInStock] = useState(item.inStock)
    const [price, setPrice] = useState(item.price)
    const [category, setCategory] = useState(item.category)
    const [description, setDescription] =  useState(item.description)

    const nameInput = useRef(null)

    function saveForm(ev){
        if(name === ""){
            ev.preventDefault()
            nameInput.current.style.borderColor = "red"
        }else{
            ev.preventDefault()
            nameInput.current.style.borderColor = "rgb(145, 145, 145)"
            const newItem = {
                id: itemId,
                name: name,
                inStock: +inStock,
                price: +price,
                category: category,
                createdAt: item.createdAt,
                updatedAt: new Date(),
                description: description
            }
    
            let oldItems = JSON.parse(localStorage.getItem("items-db")) ?? database
            const index = oldItems.findIndex(el => el.id == itemId)
            oldItems.splice(index, 1, newItem)
            localStorage.setItem("items-db", JSON.stringify(oldItems))
            updateItemInDatabase(itemId, newItem)
  
            alert("Item atualizado com sucesso!")
        }
    }

    return(
        <div>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <div className={styles.nameInput}>
                        <label htmlFor="name">Nome *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                            ref={nameInput}
                            required
                            />
                    </div>
                    <div className={styles.inStockInput}>
                        <label htmlFor="inStock">Quantidade</label>
                        <input
                            type="number"
                            id="inStock"
                            name="inStock"
                            value={inStock}
                            min={0}
                            max={99999}
                            onChange={(ev) => setInStock(ev.target.value)} 
                            />
                    </div>
                    <div className={styles.priceInput}>
                        <label htmlFor="price">Preço (R$)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={price}
                            onChange={(ev) => setPrice(ev.target.value)}
                            step={50}
                            min={0}
                            />
                    </div>
                    <div className={styles.categoryInput}>
                        <label htmlFor="category">Categoria</label>
                        <select
                            name="category"
                            id="category"
                            value={category}
                            onChange={(ev) => setCategory(ev.target.value)}
                        >
                            <option value="" disabled>-</option>
                            <option value="Esportes">Esportes</option>
                            <option value="Informática">Informática</option>
                            <option value="Livros">Livros</option>
                            <option value="Música">Música</option>
                        </select>
                    </div>
                    <div className={styles.descriptionTextArea}>
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            name="description"
                            id="description"
                            rows={4}
                            value={description}
                            onChange={(ev) => setDescription(ev.target.value)}>
                        </textarea>
                    </div>
                </div>
                <button
                    className={styles.formButton}
                    onClick={saveForm}
                >Salvar</button>
            </form>
        </div>
    )
}