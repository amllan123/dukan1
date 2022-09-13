import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import { popularProducts } from '../data'
import axios from 'axios'
const Container = styled.div`
    padding: 1.7%;
    display: flex;
    flex-wrap:wrap ;
    justify-content: space-between;
`
const Products = ({cat,filter,sort}) => {
  const url=process.env.REACT_APP_API_KEY;
 const [products,setProducts]=useState([]);
 const [filterProduct,setFilterProduct]=useState([]);

 useEffect(()=>{
  const getProducts = async () =>{
  try {
     const res= await axios.get(cat?`${url}/api/products/?category=${cat}`:`${url}/api/products/`)

     setProducts(res.data);
  } catch (error) {
    console.log(error);
  }

  }

  getProducts();

 },[cat])



 useEffect(()=>{
  cat && setFilterProduct(
    products.filter(item =>
       Object.entries (filter).every(([key,value]) =>
       item[key].includes(value)

    ))


  )
 },[products,cat,filter])

 useEffect(() => {
  if (sort === "newest") {
    setFilterProduct((prev) =>
      [...prev].sort((a, b) => b.createdAt - a.createdAt)
    );
  } else if (sort === "asc") {
    setFilterProduct((prev) =>
      [...prev].sort((a, b) => a.price - b.price)
    );
  } else if(sort==="desc") {
    setFilterProduct((prev) =>
      [...prev].sort((a, b) => b.price - a.price)
    )
   
  }

  else if(sort==="old"){
    setFilterProduct((prev) =>
      [...prev].sort((a, b) => a.createdAt - b.createdAt)
    );
  }
}, [sort]);

  return (
    <Container>
  {cat?filterProduct.map((item)=>(<Product item={item} key={item._id} />))
  :
    products.map((item)=>(<Product item={item} key={item._id} />))}

   


    </Container>
  )
}

export default Products