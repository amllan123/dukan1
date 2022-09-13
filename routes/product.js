const router = require('express').Router();
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin} =require("./verifyToken")
const Prodcut =require("../models/Product")

// create product

router.post("/",verifyTokenAndAdmin, async(req,res)=>{
   const newProduct = new Prodcut({
     title:req.body.title,
     desc:req.body.desc,
     img:req.body.img,
     categories:req.body.categories,
     price:req.body.price,
     color: req.body.color,
     size: req.body.size


   });

   try {
       const savedProduct =await newProduct.save();
       res.status(201).json(savedProduct);

    
   } catch (error) {
    res.status(500).json(error);

    
   }



})

//update product
router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
         
  try {
      const updatedProduct=await Prodcut.findByIdAndUpdate(req.params.id,{
         $set:req.body
  
      },{new:true})
  
      res.status(200).json(updatedProduct);
  } catch (error) {
      res.status(500).json(error)
  }
  
  })
  
  //delete product


  router.delete("/:id",verifyTokenAndAdmin, async(req,res)=>{
    try {
        await Prodcut.findByIdAndDelete(req.params.id);
        res.status(201).json("Product deleted");
  
    } catch (error) {
         
  res.status(500).json(error)
    }
  
  })


  //get product
  router.get("/find/:id",async (req,res)=>{
    try {
       const product=await Prodcut.findById(req.params.id);
       res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  
  })
  
  //get product by category
   router.get("/", async (req,res)=>{
   const qNew=req.query.new;
   const qCategory=req.query.category

   try {
         let products;
         if (qNew) {
          products= await Prodcut.find().sort({createdAt:-1}).limit(1);
         } else if(qCategory) {
          products =await Prodcut.find({
            categories:{
              $in:[qCategory]
            }

          })
         }else{

          products=await Prodcut.find();
         }
        res.status(200).json(products);
   } catch (error) {
       res.status(500).json(error);
   }


   })
  


module.exports = router;