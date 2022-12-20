import { createBrowserRouter, Route } from 'react-router-dom';
import App from '../App';
import ProtectedRoute from '../Hoc/protectedRoute';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Missing from '../pages/missing';
import Register from '../pages/register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  //   {
  //     path: '/dashboard',
  //     element: <ProtectedRoute />,
  //     children: [
  //       {
  //         path: '/',
  //         element: <Dashboard />,
  //       },
  //     ],
  //   },

  {
    path: '*',
    element: <Missing />,
  },
]);
