import React from 'react'
import { useLocation } from 'react-router-dom' 
import { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { useEffect } from 'react';
import { reset } from '../redux/cartRedux';
import axios from 'axios';

const Success = () => {
  const location=useLocation();
  const data=location.state.stripeData
 const cart= location.state.products
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const URL=process.env.REACT_APP_API_KEY
  const dispatch=useDispatch();
  console.log(currentUser.accessToken);

  
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
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>

   <Newsletter/>
   <Footer/>
  </>
  
  )
}

export default Success