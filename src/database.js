let db = [
    {
        id: 1,
        name: "Tênis de Corrida",
        inStock: 20,
        price: 250,
        category: "Esportes",
        //MM-DD-YYYY
        createdAt: new Date("11-01-2024"),
        updatedAt: new Date("11-01-2024"), 
        description: "Tênis para fazer o menor pace da história!"
    },
    {
        id: 2,
        name: "Cadeira Gamer",
        inStock: 10,
        price: 500,
        category: "Informática",
        createdAt: new Date("11-01-2024"),
        updatedAt: new Date("11-01-2024"), 
        description: "Cadeira confortável para quem passa muitas horas por dia sentado."
        
    },
    {
        id: 3,
        name: "Headset Gamer",
        inStock: 100,
        price: 200,
        category: "Informática",
        createdAt: new Date("11-01-2024"),
        updatedAt: new Date("11-01-2024"), 
        description: "Headset Surround 7.1"
    },
    {
        id: 4,
        name: "Mouse Gamer",
        inStock: 2,
        price: 250,
        category: "Informática",
        createdAt: new Date("11-01-2024"),
        updatedAt: new Date("11-01-2024"), 
        description: "Mouse com 4 DPIs diferentes."
    },
    {
        id: 5,
        name: "Eragon",
        inStock: 200,
        price: 50,
        category: "Livros",
        createdAt: new Date("11-01-2024"),
        updatedAt: new Date("11-01-2024"), 
        description: "Livro sobre um dragão maneirão!"
    },
    {
        id: 6,
        name: "Raquete de Tênis",
        inStock: 1,
        price: 250,
        category: "Esportes",
        createdAt: new Date("11-01-2024"),
        updatedAt: new Date("11-01-2024"), 
        description: "Raquete leve."
    },
    {
        id: 7,
        name: "Caixinha de som",
        inStock: 5,
        price: 100,
        category: "Música",
        createdAt: new Date("11-01-2024"),
        updatedAt: new Date("11-01-2024"), 
        description: "Caixinha de som com qualidade no áudio."
    }
]

let database = []
const ls = localStorage.getItem("items-db")
if(ls){
    database = JSON.parse(ls)
}else{
    database = db
}

function calcTotalCategories(){
    const categories = database.map((item) => {
        return item.category
    })
    categories.forEach((category) => {
        for(let i = 0; i < categories.length; i++){
            if(i == categories.indexOf(category)){

            }else{
                if(category == categories[i]){
                    categories.splice(i, 1)
                }
            }
        }
    })
    const totalCategories = categories.length
    return totalCategories
}

function calcTotalItems(){
    const inStockItems = database.map((item) => {
        return item.inStock
    })
    const totalItems = inStockItems.reduce((count, item) => {
        return count + item
    }, 0) 
    return totalItems
}

function calcRecentItems(){
    let recentItems = []

    const today = new Date()
    const tenDaysAgo = new Date()
    tenDaysAgo.setDate(today.getDate() - 10)

    database.forEach(item => {
        if(new Date(item.createdAt) >= tenDaysAgo){
            recentItems.unshift(item)
        }
    })

    const recentItemsInfo = recentItems.map(item => {
        return {
                    id: item.id,
                    name: item.name,
                }
    })
    
    const totalRecentItems = recentItems.length
    return {recentItemsInfo, totalRecentItems}
}

function calcLowStockItems(){
    let lowStockItems = []
    database.forEach(item => {
        if(item.inStock < 10){
            lowStockItems.push(item)
        }
    })
    lowStockItems.sort((a, b) => {
        return a.inStock - b.inStock
    })
    const lowStockItemsInfo = lowStockItems.map(item => {
        return {
                    id: item.id,
                    name: item.name,
                    inStock: item.inStock
                }
    })

    const totalLowStockItems = lowStockItems.length
    return {lowStockItemsInfo, totalLowStockItems}
}

function deleteFromDatabase(id){
    database = database.filter(item => item.id != id)
    db = db.filter(item => item.id != id)
}

function updateItemInDatabase(id, newItem){
    const index = database.findIndex(item => item.id == id)
    database.splice(index, 1, newItem)
    db.splice(index, 1, newItem)
}

export {database, calcTotalCategories, calcTotalItems, calcRecentItems, calcLowStockItems, deleteFromDatabase, updateItemInDatabase}