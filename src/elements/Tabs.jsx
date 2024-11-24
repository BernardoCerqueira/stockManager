import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AllItems from '../pages/Stock/TabBar/AllItems.jsx';
import NewItem from '../pages/Stock/TabBar/NewItem.jsx';
import { useState } from 'react';
import { database } from '../database.js';

export default function Tabs(){
    const [db, setDb] = useState(() => {
        const db = localStorage.getItem("items-db")
        if(!db) return database
        return JSON.parse(db)
    })
    const addItem = (newItem) => {
        setDb((cur) => [...cur, newItem])
    }
    const removeItem = (id) => {
        setDb((cur) => (cur.filter(item => item.id != id)))
    }

    return(
        <div className="container mt-5 mb-5">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Todos os itens</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Novo item</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <AllItems db={db} removeItem={removeItem}/>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <NewItem addItem={addItem}/>
                </div>
            </div>
        </div>
    )
}