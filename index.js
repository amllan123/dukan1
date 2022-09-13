const express=require('express');
const app= express();
const mongoose= require('mongoose');
const port=process.env.PORT||5000;
const dotenv=require('dotenv');
const userRoute=require('./routes/user')
const authRoute=require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute= require('./routes/cart')
const orderRoute=require('./routes/order')
const stripeRoute=require('./routes/stripe')
const cors=require("cors");
dotenv.config();
app.use(express.json());
const path=require('path');

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connected to MongoDB")).catch((err)=>{console.log(err);});
app.use(cors())
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/products',productRoute);
app.use('/api/carts',cartRoute);
app.use('/api/orders',orderRoute);

app.use('/api/checkout',stripeRoute);

app.use(express.static(path.join(__dirname, "/client2/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client2/build', 'index.html'));
});

app.listen(port,()=>{
console.log(`Server running at http://localhost:${port}`);

});  
