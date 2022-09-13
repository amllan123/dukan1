import {  Search,ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import Badge from '@mui/material/Badge';
import styled from 'styled-components'
import {mobile} from '../responsive'
import { useSelector } from "react-redux";
import { Navigate, NavLink ,useNavigate } from 'react-router-dom';
import {reset} from '../redux/userSlice'
import { reset as cartreset } from '../redux/cartRedux';
import { useDispatch} from 'react-redux';
import {toast} from 'react-hot-toast'

const Container = styled.div`
  height: 60px;
  ${mobile({
        height: '40px'

  })}
  
`
const Wrapper=styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({
        padding: '10px 0px'

  })}
`
const Left = styled.div`
flex:1;
display: flex;
align-items:center ;

`
const Center = styled.div`
flex:1; 
text-align: center;
`
const Right = styled.div`
  flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({
     justifyContent:'center',
     flex:'2'

  })}

`
const Lnaguage =styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({
        display: 'none'

  })}
`

const SearchConatiner = styled.div`
border: 0.3px solid lightgray;
display: flex;
align-items: center;
margin-left: 20px;
padding: 5px;
`
const Input = styled.input`
border: none;
${mobile({
      width: '50px'

  })}
`
const Logo = styled.h1`
    font-weight: 500;
    ${mobile({
        fontSize: '20px',
        marginLeft:"35px"

  })}
`
const MenuItem= styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
color: black;
text-decoration: none;
${mobile({
       fontSize: '8px',
       marginLeft:`15px`
       
       

  })}

`
const Button=styled.button`
  border: none;
  color: black;
  font-weight: 500;
  background-color:transparent;
padding:2px 5px;
cursor: pointer;


&:hover{
  background-color:black;
   color: #fff;
   transition: all 0.5s ease;
}
`
const Button2=styled.button`
   border: none;
   cursor: pointer;
   background-color: transparent;

`

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
 
  
   const handleClick=()=>{
   dispatch(reset());
   dispatch(cartreset());
  navigate("/")

   }

   const handleCart=()=>{
    if(!user){
       toast("please login to access the cart",{
        style: {
          border: '1px solid #ff0101',
          padding: '16px',
          color: '#d51723',
        }

       })
    }
    else{

      navigate("/cart")

    }

   }

  const quantity= useSelector(state => state.cart.quantity)
  const user= useSelector(state=> state.user.currentUser)
  console.log(quantity);
  return (
  <Container>
     <Wrapper>
        <Left>
           <Lnaguage>EN</Lnaguage>
           <SearchConatiner>
            
              <Input placeholder='Search'/>
              <Search style={{color:"gray", fontsize:16 }}/>

           </SearchConatiner>

        </Left>


        <Center><Logo>Dukan.</Logo></Center>
        <Right>
{!user && <NavLink to='/register'><MenuItem><Button>Register</Button></MenuItem></NavLink>}

{!user && <NavLink to='/login'><MenuItem><Button>Login</Button></MenuItem></NavLink>}
{user && <MenuItem>Hello! {user.username} </MenuItem>}
{user && <MenuItem>

  <Button onClick={handleClick}>Logout</Button>
 </MenuItem>}

 <Button2 onClick={handleCart}><MenuItem> <Badge badgeContent={quantity} color="primary">
         <ShoppingCartOutlined/>
    </Badge></MenuItem>
</Button2>
  


        </Right>

     </Wrapper>

  </Container>
  )
}

export default Navbar