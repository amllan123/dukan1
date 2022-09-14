import { Add, Remove } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive'
import { useState,useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { Converter } from "easy-currencies";
import {numberFormat} from '../requestMethods'
import { useNavigate ,Link} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import  { addProduct,reset } from '../redux/cartRedux'


const Container=styled.div``
const Wrapper = styled.div``
const Title = styled.h1`
font-weight: 300;
  text-align: center;
`
const Top = styled.div`
display: flex;
align-items: start;justify-content: space-between;
padding: 20px;

${mobile({
  padding:'10px'

  })} 

`
const TopButton = styled.button`
  padding: 10px;
  margin: 20px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  border:1px solid black ;
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  text-decoration: none;
  display: flex;
  margin-left: 30px;
  align-items: center;
  justify-content: space-between;

`;
const TopText = styled.span`
  margin-right:30px;
  cursor: pointer;
  color: black;
  text-decoration:none;
 

`;

const Bottom = styled.div`

display: flex;
justify-content: space-between;
padding: 20px;
${mobile({
  flexDirection:'column'

  })} 

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



const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 70vh;
`
const SummaryTitle =styled.span`
font-weight: 200;
`
const SummaryItem = styled.div`
 margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`
  
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
 
`;

// ---------------------------------------------------------------------------------------------------------------------------------------------



const Cart = () => {
  const dispatch=useDispatch();
  const URL=process.env.REACT_APP_API_KEY
  const cart=useSelector(state=> state.cart)
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const converter = new Converter();
  const [m,setM]=useState(1);
  const [products,setProducts]=useState([]);
  const [cartId,setCartId]=useState();
  let convertwdMoney=0;
  const convert = async () =>{
    convertwdMoney= await converter.convert(cart.total, "INR", "USD");
  setM(convertwdMoney);
 
  }
  

  //fetch cart from db
  const fetchCart = async()=>{

    try {
      const res=await axios.get(`${URL}/api/carts/find/${currentUser._id}`,{
         headers:{
          'Content-Type': 'application/json',
          token:'Bearer '+currentUser.accessToken
    
         }
       
    
      })
    
      toast("Cart Fetched");
    
      setProducts(res.data.product);
      setCartId(res.data._id);
  
      
     } catch (error) {
      
     }
  }


//use effect call for intial fetching
  useEffect(()=>{  
   dispatch(reset())

fetchCart();

convert();


  },[])
   
  useEffect(()=>{
    const dispatchProducts=()=>{
      products.map((item)=>{
          dispatch(addProduct({
           ...item
          }))
   
   
      })
   
     }
  dispatchProducts();
  },[products])

// clear cart function
 const handleClearCart=async ()=>{
  
  try {

    await axios.put(`${URL}/api/carts/${currentUser._id}/${cartId}`,{
     product:[]

    },{
      headers:{
        'Content-Type': 'application/json',
        token:'Bearer '+currentUser.accessToken
  
       }
    })
    dispatch(reset())
    fetchCart();
    toast.success("Cart cleared")
      
  } catch (error) {
    toast.error(error);
  }



 }

  
const handleContinueShopping=()=>{
  navigate('/');


}
  

  

  // PAYPAL INTEGRATION
  const amount =Math.round(m);
  const currency = "USD";
  const style = {"layout":"vertical",
  "color":"white",
  "label":"checkout"
};
  
  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
      // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
      // This is the main reason to wrap the PayPalButtons in a new component
      const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  
      useEffect(() => {
          dispatch({
              type: "resetOptions",
              value: {
                  ...options,
                  currency: currency,
              },
          });
      }, [currency, showSpinner]);
  
  
      return (<>
              { (showSpinner && isPending) && <div className="spinner" /> }
              <PayPalButtons
                  style={style}
                  disabled={false}
                  forceReRender={[amount, currency, style]}
                  fundingSource={undefined}
                  createOrder={(data, actions) => {
                      return actions.order
                          .create({
                              purchase_units: [
                                  {
                                      amount: {
                                          currency_code: currency,
                                          value: amount,
                                      },
                                  },
                              ],
                          })
                          .then((orderId) => {
                              // Your code here after create the order
                              
                              return orderId;
                          });
                  }}
                  onApprove={function (data, actions) {
                      return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                       
                        navigate("/success", { 
                           state:{ stripeData:shipping,
                            products: cart,
                            cartId:cartId
                          
                          }

                         });
                      });
                  }}
              />
          </>
      );
  }
//  END OF PAYPAL INTEGRATION






  return (
    <Container>
       <Announcement/>
       <Navbar/>
        <Wrapper>
          <Title>Your Bag</Title>
          <Top>
           <TopButton  type='filled' 
           onClick={handleContinueShopping}
           >Continue Shopping</TopButton>
         
            <Link to="/orders">  <TopButton>Your Orders</TopButton> </Link>
          
           <TopButton type='filled' onClick={handleClearCart} >Clear Cart</TopButton>
    
          </Top>
        
          <Bottom>
           <Info>
            { products.map((item,idx)=>(
                
              <div key={idx}><Product>
                <ProductDetail>
                  <Image src= {item.productImage} />
                  <Details>
                    <ProductName><b>Product: </b>{item.productTitle}</ProductName>
                    <ProductId><b>ID: </b>{item.productId}</ProductId>
                    <ProductColor color={item.productColor} />
                    <ProductSize><b>Size: </b>{item.productSize}</ProductSize>

                  </Details>
                </ProductDetail>

                <PriceDetail>
                  <ProductAmountContainer>
                   Qty:
                    <ProductAmount>{item.quantity}</ProductAmount>
                    
                  </ProductAmountContainer>
                  <ProductPrice>
                  {numberFormat(item.productPrice)}
                  </ProductPrice>
                </PriceDetail>
              </Product><Hr /></div>
              

            ))
            }
                
           
              
                

           </Info>
           <Summary>
           <SummaryTitle>ORDER SUMMARY</SummaryTitle>
           <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{numberFormat(cart.total)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 40</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>- ₹ 40 </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{numberFormat(cart.total)} / ${Math.round(m)}</SummaryItemPrice>
       

            </SummaryItem>

        
        
             <Button>

             <PayPalScriptProvider
                options={{
                    "client-id": "AWFQrnCcOhu94h8FEgqkYEVUTPp4-7HUMCuXaNcEQO-KIhxkRKHqyLH10CuIT5FKVuthSTv3FlLoBL3x",
                    components: "buttons",
                    currency: "USD"
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
			</PayPalScriptProvider>


             </Button>

     

            
           
           
           
           
           
           </Summary>

          </Bottom>

        </Wrapper>

       <Footer/>

    </Container>
  )
}

export default Cart