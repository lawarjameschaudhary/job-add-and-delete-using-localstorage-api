import React, { useEffect, useState } from 'react';
import Detailsof from './Detailsof';
import { Route, Routes } from 'react-router-dom';
import Edit from './Edit';
import Add from './add';
import DetailPage from './DetailPage';
import Login from './Login/Login';
import Signup from './Login/Signup';
// import { Toaster } from 'react-hot-toast';

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
      {/* <Toaster/> */}
      <Routes>
      <Route path="/" element={<Detailsof />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/details/:description" element={<DetailPage />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
});

export default Products;
