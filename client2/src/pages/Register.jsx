import React from 'react'
import { useState } from 'react'
 import styled from 'styled-components'
import { publicRequest } from '../requestMethods'
 import {mobile} from '../responsive'
 import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

 const Container =styled.div`
 width: 100vw;
 height: 100vh;
 background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
      display: flex;
      align-items: center; 
      justify-content: center;
      background-size: cover;
 `

 const Wrapper =styled.div`
 width: 40%;
 padding: 20px;
 background-color: #fff;
 ${mobile({
      
      width: '70%'
  })} 
 `

 const Title=styled.h3`
 font-size: 20px;
 font-weight: 300;

 `

 const Form= styled.form`
 display: flex;
 flex-wrap: wrap;

 `
  
 const Input =styled.input`
 flex: 1;
 min-width: 40%;
 margin:20px 10px 0px 0px ;
 padding: 10px;
 ${mobile({
      margin:'30px 10px 10px 0px'
  })} 
 
 
 `

 const Agreement=styled.span`
  padding: 10px;
  margin: 10px 0;
 `

 const Button=styled.button`
  border: 1px solid teal;
  padding: 10px;
  width: 40%;
  background-color: transparent;
  &:hover{
    background-color: teal;
    color: white;
    transition: all ease 0.5s;
  }
 ` 

const Register = () => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [email,setemail]=useState("");
  const [confirmpassword,setconfirmPassword]=useState("");
  const navigate= useNavigate();
  const handleRegister= async (e)=>{
    e.preventDefault()
     if (password !== confirmpassword) {
         toast.error("password is not match with confirm password")
     }
     else{
       try {
        const res=await publicRequest.post("/api/auth/register",{username,password,email})
        toast.success("Registerd Successfully")
        toast("Please Login")
        navigate('/login')

         
       } catch (error) {
        toast.error("server error")
       }


     }

    

  }
  

  return (
    <Container>
      <Wrapper>
        <Title> Create an Account</Title>
        <Form>
    
          <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
          <Input placeholder='Email' onChange={(e)=>setemail(e.target.value)}/>
          <Input placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
          <Input placeholder='Confirm password' onChange={(e)=>setconfirmPassword(e.target.value)}/>
           <Agreement>
             By creating an account , I consent to the processing of my personal 
             data in accordance with the <b>Privacy Policy</b>
            
            </Agreement>  
            <Button onClick={handleRegister}>Create Account</Button>
        </Form>

      </Wrapper>

    </Container>
  )
}

export default Register