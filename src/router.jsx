import { createBrowserRouter } from "react-router-dom";
import ItemBoundary from "./error-boundaries/ItemBoundary";
import RootLayout from "./pages/RootLayout";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Item from "./pages/Item/Item";
import UpdateItem from "./pages/UpdateItem";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: "items",
                element: <Stock/>
            },
            {
                path: "item/:itemId",
                element: <Item/>
            },
            {
                path: "updateItem/:itemId",
                element: <UpdateItem/>
            }
        ],
        errorElement: <ItemBoundary/>
    }
], {future: {v7_normalizeFormMethod: true, v7_skipActionErrorRevalidation: true, v7_partialHydration: true, v7_fetcherPersist: true, v7_relativeSplatPath: true, v7_startTransition: true}})

export default router