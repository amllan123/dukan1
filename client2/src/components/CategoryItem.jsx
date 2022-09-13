import React from 'react'
import styled from 'styled-components'
import {mobile} from '../responsive'
import { NavLink } from 'react-router-dom'
const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
   position: relative;

   
`
const Image = styled.img`
 width:100%;
 height: 90%;
 object-fit: cover;
 ${mobile({
         height: '30vh'

  })} 

`
const Info =styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
const Title =styled.h2`
 color: white;
 margin-bottom: 20px;


`
const Button =styled.button`
border: 1px solid black;
padding: 10px;
background-color: transparent;
color: gray;
font-weight:600 ;
cursor: pointer;
`

const CategoryItem = ({item}) => {
  return (
     <Container>
      
       <Image src={item.img} />
       <Info>
           <Title>{item.title}</Title>
         <NavLink to={`/products/${item.cat}`}>  <Button>Shop Now</Button>  </NavLink>
       </Info>
     

     </Container>
  )
}

export default CategoryItem