import React, { useState } from 'react';
// styles
import './index.css';
// router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// actions and loaders
import { deleteAction } from './actions/delete';
import { deleteBudget } from './actions/deleteBudget';
import { homeLoader, submitAction } from './Pages/Home';
import { expensesLoader, expensesAction } from './Pages/Expenses';
import { budgetAction, budgetLoader } from './Pages/Budget';
// layout
import RootLayout, { rootLoader } from './Layouts/RootLayout';
// pages
import { Home, Error, Expenses, Budget } from './Pages/index';
// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
        action: submitAction,
      },
      {
        path: 'budget/:id',
        element: <Budget />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: 'delete',
            action: deleteBudget,
          },
        ],
      },
      {
        path: 'expenses',
        element: <Expenses />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: 'logout',
        action: deleteAction,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
