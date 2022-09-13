import { Facebook, Instagram,  LocationOn, Mail, Phone, Twitter } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import {mobile}from '../responsive'

const Container = styled.div`
 display: flex;
 ${mobile({
        flexDirection:'column'

  })} 
`

const Left = styled.div`flex: 1;
 display: flex;
 flex-direction: column;
 padding: 20px;
`
const Center = styled.div`flex: 1;
padding: 20px;

${mobile({
        display:'none'

  })} 
`
const Right= styled.div`flex: 1;
padding: 20px;
${mobile({
     backgroundColor:'#eee'

  })} 
`
const Logo =styled.h1``
const Desc=styled.p` 
 margin: 20px 0px;
`
const SocialContainer=styled.div`display:flex;`

const SocialIcon=styled.div`

width: 40px;
height: 40px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
background-color: #${props => props.color};
margin: 10px;
color: white;

`

const Title =styled.h3`
 margin-bottom: 30px;
`
const List= styled.ul`
 margin: 0;
 padding: 0;
 list-style: none;
 display: flex;
 flex-wrap: wrap;
`
const ListItem=styled.li`
width:50%;
margin-bottom: 10px;
`
const ContactItem=styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  gap : 10px;
`

const Footer = () => {
  return (
    <Container>
     <Left>
        <Logo>Dukan.</Logo>
        <Desc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima est placeat provident ratione ad repudiandae nulla ducimus fuga quaerat! Velit voluptatibus aspernatur quo voluptas! Eligendi amet aut nemo ratione mollitia.
        </Desc>
        <SocialContainer>
                   <SocialIcon color='3b5999'>
                     <Facebook/>
                   </SocialIcon>
                   <SocialIcon color='e4405f'>
                     <Instagram/>
                   </SocialIcon>
                   <SocialIcon color='55acee'>
                     <Twitter/>
                   </SocialIcon>

        </SocialContainer>

     </Left>
     <Center>
      <Title>Useful Links</Title>
      <List>
        <ListItem>Home</ListItem>
        <ListItem>Cart</ListItem>
        <ListItem>Man Fashion</ListItem>
        <ListItem>Accessories</ListItem>
        <ListItem>Track Order</ListItem>
        <ListItem>WishList</ListItem>
        <ListItem>Care & Support</ListItem>
      </List>
     </Center>
     <Right>
      <Title>Contact</Title>
      <ContactItem><LocationOn/>Plot.No:45 xyz Colony Mumbai 400103</ContactItem>
      <ContactItem><Phone/>+91 8063862889</ContactItem>
      <ContactItem><Mail/>Dukan@gmail.com</ContactItem>
   
   
     </Right>



    </Container>
  )
}

export default Footer