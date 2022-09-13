import { Add, Remove } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import {mobile } from '../responsive'
import {publicRequest,numberFormat, userRequest} from "../requestMethods"
import {useDispatch,useSelector} from 'react-redux'
import {addProduct} from '../redux/cartRedux'
import toast from 'react-hot-toast';
import axios from 'axios'



const Container=styled.div`
`
const Wrapper =styled.div`
padding: 50px;
display: flex;
${mobile({
   padding:'10px',
    flexDirection:'column'  
  })} 
`
const ImageContainer=styled.div`
flex: 1;
`
const Image=styled.img`
width: 90%;
height: 90vh;
object-fit: cover;
${mobile({
   width: '100%',
height: '50vh',
paddingTop:'10px'

  })} 


`
const InfoContainer=styled.div`
padding:0px 50px ;
flex: 1;

${mobile({
padding:'10px' 

  })} 

  
`
const Title=styled.div`
  font-weight: 200;
`
const Desc=styled.p`
margin:20px 0px;
`
const Price=styled.span`

font-weight: 100;

font-size: 40px;`


const FilterContainer=styled.div`
width: 50%;
margin: 30px 0px;
 display: flex;
 justify-content: space-between;

 ${mobile({
  width:'100%'

  })} 

 
 
`

const Filter=styled.div`
  display: flex;
  align-items: center;

`

const FilterTitle=styled.span`
font-size: 20px;
font-weight: 200;

`

const FilterColor=styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color:${props =>props.color} ;
background-color:#${props =>props.color} ;
margin: 0 5px;
cursor: pointer;
`

const FilterSize=styled.select`
margin-left: 10px;
padding: 5px;
`

const FilterSizeOption=styled.option`
font-weight: bold;
`
const AddContainer=styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: space-between;

${mobile({
  width:'100%'

  })} 
`
const AmmountContainer=styled.div`
display: flex;
align-items: center;font-weight: 700;
`
const  Ammount=styled.div`
 width: 30px;
 height: 30px;
 border-radius: 10px;
 border: 1px solid lightgray;
 display: flex;
 align-items: center;
 justify-content: center;
 margin: 0 10px;
`


const Button =styled.button`
padding: 15px;
border: 3px solid teal;
font-weight: 500;
background-color: transparent;
cursor: pointer;

 &:hover{
   background-color:teal;
   color: #fff;
   transition: all 0.5s ease;
   
 }
`


// -------------------------------------------------------------------------------------------------------------------------------------





const Product = () => {

 const location=useLocation(); 
 const prductId=location.pathname.split('/')[2];
 const [product,setProduct]=useState({});
const [colors,setColors]=useState([]);
const [sizes,setSizes]=useState([]);
const[quantity,setQuantity]=useState(1);
const [color,setColor]=useState("");
const [size,setSize]=useState("");
const dispatch=useDispatch();
const currentUser = useSelector((state) => state.user.currentUser);
const URL=process.env.REACT_APP_API_KEY
const handleQuantity =(prop)=>{
 if(prop==='inc'){setQuantity(quantity+1)}else{quantity>1? setQuantity(quantity-1):setQuantity(quantity)}
}





  useEffect(()=>{
    const getProduct =async ()=>{
      try {
         const res= await publicRequest.get(`/api/products/find/${prductId}`)
         setProduct(res.data)
         setColors(res.data.color)
         setSizes(res.data.size)
        
      } catch (error) {
        console.log(error);
      }
    
     
    }

     getProduct();
  },[prductId])



const handleClick = async ()=>{
    if(!currentUser){
      toast.error("Login to Cart the item")
      return;
    }
  try {

  
    
   const res=await axios.post(`${URL}/api/carts/${currentUser._id}`,     {
    userId: currentUser._id,
    productTitle:product.title,
    productId:product._id,
    quantity:quantity,
    productImage:product.img,
    productPrice:product.price,
    productColor:color,
    productSize:size
  },{
     headers:{
      'Content-Type': 'application/json',
      token:'Bearer '+currentUser.accessToken

     }
   

  })

    toast.success('Added to Cart');
  } catch (error) {
    toast.error("server error")
  }
  

   
   

}

  return (
<Container>
<Announcement/>
<Navbar/>
 <Wrapper>
   <ImageContainer>
      <Image src={product.img} />
   </ImageContainer>
   
   <InfoContainer>
        <Title>{`${product.title}`}</Title>
        <Desc>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime temporibus asperiores itaque commodi culpa laudantium eveniet, accusantium dolorum harum aliquid aliquam molestias doloribus quasi eius, quisquam possimus perferendis? Natus, explicabo!</Desc>
        <Price>{numberFormat(product.price)}</Price>
        
      <FilterContainer>

     <Filter>
            <FilterTitle>Color</FilterTitle>

           {
            colors.map(c=>{
             return <FilterColor color={c} key={c}  onClick={()=>setColor(c)}/>


            })

           }
          

           
         

     </Filter>
     <Filter>
            <FilterTitle>Size</FilterTitle>
           <FilterSize onChange={(e)=>setSize(e.target.value)} >
            {
              sizes.map(c=>(

                <FilterSizeOption key={c} >{c}</FilterSizeOption>
              ))
            }
             
           
           </FilterSize>

     </Filter>

   </FilterContainer>
    <AddContainer>
       <AmmountContainer>
         <Remove onClick={()=>handleQuantity("dec")} />
       <Ammount>{quantity}</Ammount>  
         <Add onClick={()=>handleQuantity("inc")} />
       </AmmountContainer>
        <Button onClick={handleClick}>Add To Cart</Button>
            </AddContainer>
   
   </InfoContainer>

 

 </Wrapper>


<Newsletter/>
<Footer/>
</Container>
  )
}

export default Product