import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Order from "./pages/Order";
import { BrowserRouter, Route, Routes ,Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import {useSelector} from"react-redux"
 
function App() {
 const user= useSelector(state=> state.user.currentUser)

  return (
<>
<div>
  <Toaster position='top-center'
  
  toastOptions={{
   success:{
    theme:{

      primary:'rgb(79, 250, 0)'
    },

   },

  }}
  >
    

  </Toaster>
</div>


<BrowserRouter>
  <Routes>
   <Route exact path="/" element={<Home/>} />
   <Route exact path="/products/:category" element={<ProductList/>} />
   <Route exact path="/product/:id" element={<Product/>} />
   <Route exact path="/cart" element={user?<Cart/>: <Navigate to={"/login"}/>} />
   <Route exact path="/orders" element={user?<Order/>: <Navigate to={"/login"}/>  } />
<Route exact path="/login" element={user?(<Navigate to={"/"} />

):<Login/>} >
</Route>
   <Route exact path="/register" element={user?(<Navigate to={"/"} />
): <Register/>} />

<Route exact path="/success" element={<Success/>} />
  </Routes>


</BrowserRouter>

</>
  );
}

export default App;
