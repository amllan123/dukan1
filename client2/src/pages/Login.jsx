import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import {mobile} from '../responsive'
import {useDispatch,useSelector}from 'react-redux'
import toast from 'react-hot-toast';

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
width: 20%;
padding: 20px;
background-color: #fff;

${mobile({
         height: '40%',
         width:'70%'

  })} 
`

const Title=styled.h3`
font-size: 20px;
font-weight: 300;

`

const Form= styled.form`
display: flex;
flex-direction: column;

`
 
const Input =styled.input`
flex: 1;
min-width: 40%;
margin:20px 10px 0px 0px ;
padding: 10px;
${mobile({
      margin:'30px 0px 10px 0px'   
  })} 

`


const Button=styled.button`
 border: 1px solid teal;
 padding: 10px;
 width: 40%;
 background-color: transparent;
 margin: 20px 0;
 &:hover{
   background-color: teal;
   color: white;
   transition: all ease 0.5s;
 }
` 

const Link=styled.a`

margin: 10px 0px;
font-size: 12px;
text-decoration:underline;
cursor: pointer;
`

// --------------------------------------------------------------------------------------------------------------------------------------------

const Login = () => {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("") 
  const {isFetching,error} = useSelector(state=> state.user)
  const dispatch=useDispatch();
  const handleLogin=(e)=>{
  e.preventDefault()
  login(dispatch,{username,password})
  if(error){
   toast.error("Wrong credential")

  }
  else {
   toast.success("Login Successful")

  }

  }

  
  return (
    <Container>
      <Wrapper>
        <Title> Create an Account</Title>
        <Form>
   
          <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
          <Input placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>

            <Button
              onClick={handleLogin}
            >Sign In</Button>
            <Link>Forget password ?</Link>
            <Link>Create Account</Link>
        </Form>

      </Wrapper>

    </Container>  
  )
}

export default Login