import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import {numberFormat} from '../requestMethods'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const Container=styled.div``
const Wrapper = styled.div``
const Title = styled.h1`
font-weight: 300;
  text-align: center;
`
const Info = styled.div`
  flex: 3;
`;

const Product=styled.div`
display: flex;
justify-content: space-between;
${mobile({
  flexDirection:'column'

  })} 
`
const ProductDetail=styled.div`
flex: 2;
display: flex;
`

const Image=styled.img`
  width: 200px;
`
const Details=styled.div`
 padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ProductName=styled.h2``
const ProductId=styled.span``
const ProductColor=styled.div`
 width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  background-color: #${(props) => props.color};
`
const ProductSize=styled.span``
const PriceDetail=styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductAmountContainer=styled.div`
 display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const ProductAmount=styled.span` font-size: 24px;
margin: 10px;`

const ProductPrice=styled.span`
 font-size: 30px;
  font-weight: 200;
`
const Hr=styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 5px 0;

`


const Order = () => {
    const dispatch=useDispatch();
    const URL=process.env.REACT_APP_API_KEY
    const currentUser = useSelector((state) => state.user.currentUser);
    const [products,setProducts]=useState([]);

    const fetchOrder = async()=>{
        try {
       
            const res= await axios.get(`${URL}/api/orders/${currentUser._id}`,{headers:{
                 'Content-Type': 'application/json',
                 token:'Bearer '+currentUser.accessToken}})

                 setProducts(res.data)
                 
        toast.success("order fetched")
   
         } catch {
     

         }
    }


     useEffect(()=>{
          fetchOrder();
        
     },[])
const date=(d)=>{
    var d = new Date(d);

    var date = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
    var newDate = date + "/" + month + "/" + year;
    
    return newDate;

}














  return (
    <>
    <Container>
        <Navbar/>
      <Wrapper>
      <Title>Your Orders</Title>
      <Info>
            
               {products.map((item)=>(
                 <div key={item._id}><Product>
                 <ProductDetail>
                   <Image src={item.productImage} />
                   <Details>
                     <ProductName><b>Product: </b>{item.productTitle}</ProductName>
                     <ProductId><b>Order ID: </b>{item._id}</ProductId>
                     <ProductId><b>Product ID: </b>{item.productId}</ProductId>
                     <ProductColor color={item.productColor} />
                     <ProductSize><b>Size:</b>{item.productSize}</ProductSize>
                     <ProductId><b>Ordered On: </b> {date(item.createdAt)}</ProductId>
                     <ProductId><b>Delivery address: </b> {item.adress}</ProductId>
                     
   
                   </Details>
                 </ProductDetail>
   
                 <PriceDetail>
                   <ProductAmountContainer>
                   
                     <ProductAmount>{item.quantity}</ProductAmount>
                   
                   </ProductAmountContainer>
                   <ProductPrice>
                   {numberFormat(item.productPrice)}
                   </ProductPrice>
                 </PriceDetail>
               </Product><Hr /></div>


               ))} 
            
            

       
              
         
            
              

         </Info>
  

      </Wrapper>
      <Footer/>


    </Container>
      
    
    </>
  )
}

export default Order