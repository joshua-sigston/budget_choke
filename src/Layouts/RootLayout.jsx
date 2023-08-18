import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
// utils
import { fetchData } from '../utils/storage';
// components
import { Nav } from '../components';

// loader
export function rootLoader() {
  const username = fetchData('username');
  return { username };
}

const RootLayout = () => {
  const { username, budgets } = useLoaderData();

  return (
    <>
      <Nav username={username} />
      <Outlet />
    </>
  );
};

export default RootLayout;
