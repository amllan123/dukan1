import React from 'react'
import { useLocation,Link } from 'react-router-dom' 
import { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { useEffect } from 'react';
import { reset } from '../redux/cartRedux';
import axios from 'axios';
import toast from 'react-hot-toast';

const Success = () => {
  const location=useLocation();
  const data=location.state.stripeData
 const cart= location.state.products
 const cartId=location.state.cartId
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const URL=process.env.REACT_APP_API_KEY
  const dispatch=useDispatch();

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

        
    } catch (error) {
    
    }
  
  
  
   }

  
  useEffect(() => {
    const createOrder = async () => {
      try {
         cart.products.map(async (item)=>{
          await axios.post(`${URL}/api/orders/${currentUser._id}`,{
           userId:currentUser._id,
           productId:item.productId,
           productTitle:item.productTitle,
           quantity:item.quantity,
           productImage:item.productImage,
           productPrice:item.productPrice,
           productColor:item.productColor,
           productSize:item.productSize,
           adress:data.address.address_line_1,
           status:"paid and deliver"

          },{

            headers:{
              'Content-Type': 'application/json',
              token:'Bearer '+currentUser.accessToken
        
             }
          }
          
          
          )




         })
          toast.success("Ordered Successfully")
         handleClearCart();



         


      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);


  return (<>
   <Navbar/>
   <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      
      <h3>Order has been created successfully</h3>
        
        <Link to='/'>  <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button></Link>
        <Link to='/orders'>  <button style={{ padding: 10, marginTop: 20 }}>Go to OrderList</button></Link>
    
    </div>

   <Newsletter/>
   <Footer/>
  </>
  
  )
}

export default Success