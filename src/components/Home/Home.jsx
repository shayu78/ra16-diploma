import React from 'react';
import TopSales from '../TopSales/TopSales';
import Catalog from '../Catalog/Catalog';

export default function Home() {
  return (
    <>
      <TopSales />
      <Catalog searchSupport={false} />
    </>
  );
}
