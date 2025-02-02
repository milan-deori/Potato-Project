import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ImageUpload from '../components/home'
import Early_Blight from "../components/Early_Blight";
import Late_Blight from '../components/Late_Blight'







const router=createBrowserRouter([

    {
        path:"/",
        element:< App/>,
        children:[
            {
                path:"",
                element: <ImageUpload/>

            },
            {
                path:"/Early-Blight",
                element:<Early_Blight/>
            },
            {
                path:"/Late-Blight",
                element:<Late_Blight/>
            }
        ]

    }

]);

export default router;