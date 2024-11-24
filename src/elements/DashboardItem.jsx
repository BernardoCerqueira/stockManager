import styles from "../pages/Dashboard/Dashboard.module.css"
import PropTypes from "prop-types"

DashboardItem.propTypes = {
    h3: PropTypes.string,
    func: PropTypes.number
}

export default function DashboardItem({h3, func}){
    return(
        <div className={styles.dashboardItem}>
            <h3>{h3}</h3>
            <p>{func}</p>
        </div>
    )
}