import React, { useState } from 'react'
import styled from 'styled-components'
import { ArrowLeftOutlined, ArrowRightOutlined, Key } from '@mui/icons-material'
import { sliderItems } from '../data'
import {mobile} from '../responsive'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
 width: 100%;
 height: 100vh;
 display: flex;
 overflow: hidden;
 position: relative;

 ${mobile({
        display: 'none'

  })}

`
const Arrow =styled.div`
width: 50px;
height: 50px;
background-color: #fff7f7;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
top: 0;
bottom:0;
margin:auto;
left:${props=> props.direction === "left" && "10px"};

right:${props=> props.direction === "right" && "10px"};
opacity: 0.5;
cursor: pointer;
z-index: 2;
`
const Wrapper = styled.div`
 height:100%;
 display: flex;
 transform: translateX(${props => props.slideIndex * -100}vw);
 transition: all 1.5s ease;

 `
const Slide= styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items:center;
`
const ImgContainer= styled.div`
  flex: 1;
height: 100%;
`
const Image=styled.img`
  height: 90%;
  margin-left: 2%;
`
const InfoContainer= styled.div`
 flex: 1;
 padding: 50px;
`
const Title= styled.h1`
font-size: 70px;
  
`
const Desc= styled.p`
  margin: 50px 0px;
  font-size: 20;
  font-weight: 500;
  letter-spacing: 2px;
`
const Button= styled.button`
  padding: 10px;
  font-size: 20 px;
  background-color: transparent;
  cursor: pointer;
  &:hover{
    background-color: black;
    color: white;
    transition: ease all .3s;
  }

`
const Slider = () => {
const [slideIndex , SetslideIndex]=useState(0);

const handleClick= (direction)=>{
  if(direction==="left"){
    SetslideIndex( slideIndex>0? slideIndex-1: 2);
  }
  else{
    SetslideIndex( slideIndex<2? slideIndex+1:0 );
    
  }



}


  return (
<>
<Container>

       <Arrow direction="left" onClick={()=>{handleClick("left")}}>
          <ArrowLeftOutlined/>
       </Arrow>
          <Wrapper slideIndex={slideIndex}>
           {sliderItems.map((item,idx)=>(
             
             <div key={item.id}><Slide>
               <ImgContainer>
                 <Image src={`${item.img}`}/>

            
             </ImgContainer><InfoContainer>
                 <Title>{item.title}</Title>
                 <Desc>{item.desc}</Desc>
                 <NavLink to={`/products/${item.cat}`}>  <Button>Shop Now</Button>  </NavLink>
               </InfoContainer>
          </Slide></div>

           ))}
           
             
          </Wrapper>
       <Arrow direction="right" onClick={()=>{handleClick("right")}}>
         <ArrowRightOutlined/>
       </Arrow>
      
   
</Container>


</>
  )
}

export default Slider