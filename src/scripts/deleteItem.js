import { database, deleteFromDatabase } from "../database";

export default function deleteItem(itemId, removeItem){
    const confirm = window.confirm("Você deseja mesmo excluir esse item?")
    if(confirm){
        const id = String(itemId)
        
        deleteFromDatabase(id)
    
        let oldDb = JSON.parse(localStorage.getItem("items-db")) ?? database
        let newDb = oldDb.filter(item => item.id != id)
        localStorage.setItem("items-db", JSON.stringify(newDb))
    
        if(removeItem){
            removeItem(id)
        }
    }
}