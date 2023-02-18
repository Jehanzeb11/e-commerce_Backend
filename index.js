const express = require("express")

const mongoose = require("mongoose")

const cors = require("cors")

const dotenv = require("dotenv")

const Userrouter = require("./routes/user")
const authrouter = require("./routes/auth")
const Productrouter = require("./routes/Products")
const Cartrouter = require("./routes/Cart")
const Orderrouter = require("./routes/Order")
const stripeRoute = require("./routes/stripe")



dotenv.config()


const app = express()



app.use(cors())
app.use(express.json())

app.use("/api/users",Userrouter)
app.use("/api/auth",authrouter)
app.use("/api/product",Productrouter)
app.use("/api/carts",Cartrouter)
app.use("/api/orders",Orderrouter)
app.use("/api/checkout",stripeRoute)







const port = process.env.PORT || 5050

mongoose.connect(process.env.mongoUrl)
.then(()=>{
    console.log("mongoDb connected")
}).catch((err)=>{
console.log(err)
})



app.listen(port ,()=>{
console.log(`server is running on PORT : ${port}`)
})