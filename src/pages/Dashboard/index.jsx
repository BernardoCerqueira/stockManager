import { Link } from "react-router-dom"
import {calcTotalCategories, calcTotalItems, calcRecentItems, calcLowStockItems} from "../../database.js"
import styles from "./Dashboard.module.css"
import DashboardItem from "../../elements/DashboardItem.jsx"

export default function Dashboard(){
    return(
        <>
            <h1 style={{fontWeight: 200}}>Dashboard</h1>

            <div className={styles.dashboardDiv}>      
                <DashboardItem h3="Diversidade de itens" func={calcTotalCategories()}/>
                <DashboardItem h3="Inventário total" func={calcTotalItems()}/>
                <DashboardItem h3="Itens recentes" func={calcRecentItems().totalRecentItems} />
                <DashboardItem h3="Itens acabando" func={calcLowStockItems().totalLowStockItems} />
            </div>

            <div className={styles.tablesDiv}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Itens Recentes</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            calcRecentItems().recentItemsInfo.map(item => (
                                <tr key={item.id}> 
                                    <td>{item.name}</td>
                                    <td>
                                        <Link to={`/item/${item.id}`}>
                                            <button>Ver</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Itens Acabando</th>
                            <th>Qtd.</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {
                            calcLowStockItems().lowStockItemsInfo.map(item => (
                                <tr key={item.id}> 
                                    <td>{item.name}</td>
                                    <td>{item.inStock}</td>
                                    <td>
                                        <Link to={`/item/${item.id}`}>
                                            <button>Ver</button>
                                        </Link></td>
                                </tr>
                            ))
                        } 
                    </tbody>
                </table>
            </div>
        </>
    )
}