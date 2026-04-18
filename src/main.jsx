import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllBooks from './components/AllBooks/AllBooks.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import MyBooks from './components/MyBooks/MyBooks.jsx';
import AddBook from './components/AddBook/AddBook.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import Login from './components/Login/Login.jsx';
import UpdateBook from './components/UpdataBook/UpdateBook.jsx';
import BookDetails from './components/BookDetails/BookDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
      {
        index:true,
        Component:Home,
      },
      {
        path:'/allBooks',
        Component:AllBooks
      },
      {
        path:'/register',
        Component:Register
      },
      {
        path:'/login',
        Component:Login
      }
      ,
      {
        path:'/myBooks',
        element:<PrivateRoute><MyBooks></MyBooks></PrivateRoute>
      },
      {
        path:'/allBooks/addBook',
        element:<PrivateRoute><AddBook></AddBook></PrivateRoute>
      },
     {
  path: '/allBooks/update/:id', 
  element: <PrivateRoute><UpdateBook /></PrivateRoute>
},
{
  path: '/allBooks/details/:id', 
  element:<PrivateRoute><BookDetails></BookDetails>  </PrivateRoute>
}
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
