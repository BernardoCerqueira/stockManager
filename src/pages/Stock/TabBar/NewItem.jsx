import { useRef, useState } from "react"
import { v4 } from "uuid"
import styles from "../Stock.module.css"
import { database } from "../../../database"
import PropTypes from "prop-types"

NewItem.propTypes = {
    addItem: PropTypes.func
}

export default function NewItem({addItem}){
    const nameInput = useRef(null)

    const [name, setName] = useState("")
    const [inStock, setInStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState("")
    const [description, setDescription] =  useState("")

    const [items, setItems] = useState(() => {
        const db = localStorage.getItem("items-db")
        if(!db) return database
        return JSON.parse(db)
    })

    function saveForm(ev){
        if(name === ""){
            ev.preventDefault()
            nameInput.current.style.borderColor = "red"
        }else{
            ev.preventDefault()
            nameInput.current.style.borderColor = "rgb(145, 145, 145)"
            const newItem = {
                id: v4(),
                name: name,
                inStock: +inStock,
                price: +price,
                category: category,
                createdAt: new Date(),
                updatedAt: new Date(),
                description: description
            }
    
            setName("")
            setInStock(0)
            setPrice(0)
            setCategory("")
            setDescription("")
    
            localStorage.setItem("items-db", JSON.stringify([...items, newItem]))
            addItem(newItem)
            database.push(newItem)
            
            nameInput.current.focus() 
            alert("Item adicionado com sucesso!")  
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