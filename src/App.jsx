import React, { useEffect, useState } from 'react';
import Detailsof from './Detailsof';
import { Route, Routes } from 'react-router-dom';
import Edit from './Edit';
import Add from './add';
import DetailPage from './DetailPage';
// import Home from './Home';

const Products = React.memo(() => {
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/details');
        const data = await response.json();
        setDetail(data);
      } catch (error) {
        console.log("error")
      }
    };

    getProducts();
  }, []);

  return (
    <div className="flex justify-center h-full items-center">
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
      <Route path="/" element={<Detailsof />} />
      <Route path="/details/:description" element={<DetailPage />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
});

export default Products;
