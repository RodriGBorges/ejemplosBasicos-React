import { Error404 } from '../components/Error404'
import { Home } from '../components/Home'
import { ShowHideMessage } from '../components/ShowHideMessage'

export const routesPublic =  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/showHideMessage",
      element: <ShowHideMessage />,
    },
    {
      path: "/*",
      element: <Error404 />,
    }
  ]