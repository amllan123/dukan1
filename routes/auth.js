const router = require('express').Router();
const User = require("../models/User")
const CryptoJs=require('crypto-js')
const jwt= require('jsonwebtoken')
//Register
router.post('/register',async (req, res)=>{
 const newUser = new User({
    username: req.body.username,
        email: req.body.email,
        password:CryptoJs.AES.encrypt(req.body.password,process.env.PASSWORD_SEC).toString()

 });

try {
    const saveduser= await newUser.save();
    console.log(saveduser);
    res.status(201).json(saveduser);
} catch (error) {

    res.status(500).json(error);
}


});

//Login route

router.post('/login',async(req,res)=>{
  
    try {
        const user = await  User.findOne({username:req.body.username});
        !user && res.status(401).json("Wrong credentials");


        const hashedPassword =CryptoJs.AES.decrypt(user.password,process.env.PASSWORD_SEC);
        const Originalpassword =hashedPassword.toString(CryptoJs.enc.Utf8);
        
        Originalpassword !== req.body.password && res.status(401).json("Wrong credentials");
        const {password, ...other}=user._doc;
            const accessToken =jwt.sign({
              id:user._id,
              isAdmin:user.isAdmin

            },process.env.JWT_SEC,
            {expiresIn:"3d"}
            )
         

        res.status(200).json({...other,accessToken});


    } catch (error) {

        res.status(500).json(error)
        
    }

})


module.exports = router;