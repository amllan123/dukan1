import { Send } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import {mobile} from '../responsive'


const Conatiner = styled.div`
height: 60vh;
background-color: #fcf5f5;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

${mobile({
         height: '40vh'

  })} 
`
const Title=styled.h2`
font-size: 70px;
margin-bottom: 30px;
${mobile({
         fontSize: '40px'

  })} 

`
const Description =styled.p`
 font-size: 24px;
 margin-bottom:30px ;
 ${mobile({
         textAlign:'center'

  })} 
`
const InputConatiner= styled.div`
  width: 50%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;

  ${mobile({
         width:'80%'

  })} 

`
const Input=styled.input`
border:none;
flex:8;
padding-left: 20px;

`
const Button =styled.button`
flex:1;
border: none;
background-color:teal;
color: white;
 
`
const Newsletter = () => {
  return (
   <Conatiner>
     <Title>NewsLetter</Title>
     <Description>Get timely upadtes from your favourite brands</Description>
     <InputConatiner>
         <Input placeholder='Your E-mail' />
         <Button>
            <Send/>
         </Button>
       
     </InputConatiner>


   </Conatiner>



  )
}

export default Newsletter