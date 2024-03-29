import React from 'react'
import styled from 'styled-components'
import {  FavoriteBorderOutlined,SearchOutlined,ShoppingCartOutlined } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

  const Container = styled.div`
  flex: 1;
  margin:5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#f5fbfd ;
  position: relative;
  `
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color:white ;
    position: absolute;


  `
  const Image = styled.img`
   height: 75%;
  z-index: 2;
  min-width: 200px;
  `
  const Info=styled.div`
  opacity: 0;
  width:100%;
  height:100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color:rgba(0,0,0,0.1);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    opacity: 1;
    transition: all .7s ease;
    cursor: pointer;
  }

  `
  const Icon =styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin: 10px;
 transition: all 0.5s ease;
  &:hover{
    background-color: #e9f5f5;
    transform: scale(1.1);
    cursor: pointer;
  }
  `


const Product = ({item}) => {
  return (
    <Container>
        <Circle/>
        <Image src={item.img} />
        <Info>
            <Icon>
               <ShoppingCartOutlined/>

            </Icon>
            <Icon>

            <NavLink to={`/product/${item._id}`}><SearchOutlined/></NavLink>
            </Icon>
            <Icon>
             <FavoriteBorderOutlined/>
               
            </Icon>
        </Info>
    </Container>
  )
}

export default Product