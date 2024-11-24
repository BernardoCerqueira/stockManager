import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ItemBoundary(){
    const error = useRouteError()
    if(isRouteErrorResponse(error)){
        switch(error.status){
            case 404:
                return <h2>Página não encontrada.</h2>
            case 500:
                return <h2>Erro no servidor.</h2>
        }
    }
    return(
        <>
            <h2>Ouve um erro!</h2>
            <p>Mensagem: {error.message}</p>
        </>
    ) 
}