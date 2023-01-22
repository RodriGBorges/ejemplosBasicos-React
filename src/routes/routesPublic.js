import { Error404 } from '../components/Error404';
import { Home } from '../components/Home';
import { ProgressBar } from '../components/ProgressBar';
import { ShowHideMessage } from '../components/ShowHideMessage';
import { ShowHideMessagePractica } from '../components/myPractices/ShowHideMessage2';
import { ProgressBarPractica } from '../components/myPractices/ProgressBar2';
import { StopwatchTimer } from '../components/StopwatchTimer';

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
      path: "/progressBar",
      element: <ProgressBar />,
    },
    {
      path: "/stopwatchTimer",
      element: <StopwatchTimer />,
    },
    {
      path: "/*",
      element: <Error404 />,
    },
    /* Prácticas */
    {
      path: "/myPractices/showHideMessage2",
      element: <ShowHideMessagePractica />,
    },
    {
      path: "/myPractices/progressBar2",
      element: <ProgressBarPractica />,
    },
  ]