import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import {mobile} from '../responsive'


const Container =styled.div`
    
`
const Title =styled.h2`
margin: 20px;
`

const FliterConatiner =styled.div`
display: flex;
justify-content: space-between;`

const Filter =styled.div`
margin: 20px;

${mobile({
    display:'flex',
    flexDirection:'column'  
    ,alignItem:'center'
 
    
  })} 

`

const FilterText =styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;

`
const Select=styled.select`
padding: 10px;
margin-right: 10px;
${mobile({
    margin:'10px 0px'
 
    
  })} 

`

const Option=styled.option``



const ProductList = () => {


  

  const location=useLocation();
  const cat=location.pathname.split("/")[2]
  const [filter,setFilter]=useState({});
  const [sort,setSort]=useState("newest")
  const handleFilter = (e)=>{
    const value=e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value==="Color"?"":value

    })

 console.log(filter);
  } 
 console.log(sort);

  return (
    <Container>
    <Announcement/>
    <Navbar/>
    <Title>Dresses</Title>
    <FliterConatiner>
      <Filter><FilterText>Filter</FilterText>
      <Select name='color' onChange={handleFilter}>
        <Option >Color</Option>
        <Option>White</Option>
        <Option>blue</Option>
        <Option>black</Option>
        <Option>Yellow</Option>
      </Select>

      <Select name='size' onChange={handleFilter}>
        <Option >Size</Option>
        <Option>S</Option>
        <Option>M</Option>
        <Option>L</Option>
        <Option>XL</Option>
      </Select>
      </Filter>


      <Filter><FilterText>Sort</FilterText>
      <Select onChange={e=> setSort(e.target.value)} >
        <Option value="newest">Newest</Option>
        <Option value="asc">Price Low to High</Option>
        <Option value="desc">Price High to Low</Option>
        <Option value="old">Older</Option>
     
      </Select>
      
      </Filter>
   
   
   </FliterConatiner>
   <Products cat={cat} filter={filter} sort={sort}/>
   <Newsletter/>
   <Footer/>


    </Container>
  )
}

export default ProductList