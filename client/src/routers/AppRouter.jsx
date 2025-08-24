import { RouterProvider, createBrowserRouter } from "react-router"
import Home from "../pages/Home"
import PlayerDetail from "../pages/PlayerDetail"


const router = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: 'player-detail/:team/:name', element: <PlayerDetail/>}
]) 


const AppRouter = () => {
    return (
        <>
        <RouterProvider router={router}></RouterProvider>
        </>
    )
}

export default AppRouter