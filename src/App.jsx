import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Landing from './pages/Landing';
import Cocktail from './pages/Cocktail';
import About from './pages/About';
import NewsLetter from './pages/NewsLetter';
import Error from './pages/Error';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//loaders
import { loader as landingLoader } from './pages/Landing';
import {loader as singleCocktailLoader} from './pages/Cocktail'

//actions
import {action as newsLetterAction} from './pages/NewsLetter'

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      staleTime: 1000 * 60 * 5
    }
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
      },
      {
        path: 'cocktail/:id',
        element: <Cocktail />,
        loader: singleCocktailLoader(queryClient),
        errorElement: <Error />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'news-letter',
        action: newsLetterAction,
        element: <NewsLetter />,
        errorElement: <h2>Some error..</h2>
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
};
export default App;
