const express = require("express")
const dotenv= require("dotenv")
const mongoose =require("mongoose")
const cors =require("cors")
const AuthRoute =require("./routes/auth")
const ProductRoute =require("./routes/product")
const OrderRoute =require("./routes/order")
const morgan = require("morgan")
const stripe = require("stripe")(process.env.SEC_STRIPE)

dotenv.config()
const app = express()
app.use(cors())
mongoose.connect(process.env.DataDB)
.then(()=>{
    console.log('DBdatabase connacted');
}).catch((err)=>{
    console.log("error in DB " +err);
});

app.use(morgan("dev"))

app.use(express.json())

app.use("/api/auth" , AuthRoute)
app.use("/api/product" , ProductRoute)
app.use("/api/order" , OrderRoute)
app.post("/api/payment", async(req,res)=>{
  const { token , amount } = req.body
  try {
    const charge = await stripe.charges.create({
      source: token.id,
      amount: amount,
      currency: 'usd'
    });
    res.status(200).send({ success :true })
  } catch (error) {
    res.status(500).send({ error})
  }
  
});

const PORT = process.env.PORT
app.listen(PORT,(req,res)=>{
    console.log("Server in port="+PORT);
})
