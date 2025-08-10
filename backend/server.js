const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const menuRouter = require('./routes/menuRouter');
const branchesRouter = require('./routes/branchesRouter');
const cartRouter = require('./routes/cartRouter')
const guestId = require('./routes/guestId');
const orderRouter = require('./routes/orderRouter');
const checkoutRouter = require('./routes/checkoutRouter')
const paymobrouter = require('./routes/paymob')

require('dotenv').config();

// const menuItemSchema = new mongoose.Schema({
//     "_id": Number,
//     "title": String,
//     "description": String,
//     "price": Number,
//     "imageUrl": String,
//     "category": String,
//     "extras": {
//         type: Array,
//         required: false
//     }
// })

// mongoose.connect("mongodb://localhost:27017/Taiyaki-Website").then(()=> {
//     console.log("Connected to database");
// }).catch((err)=> {
//     console.log(err);
// })
// const menuItem = mongoose.model("menu",menuItemSchema,  "menu");
// menuItem.find().then((data)=> {
//     console.log(data);
// })
mongoose.connect('mongodb://localhost:27017/Taiyaki-Website', {
  useNewUrlParser: true,  
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log(err);
});
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(cors({
     origin: 'http://localhost:5173' || '*'
   }));
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)    
})
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/api/menu' , menuRouter)
app.use('/api/branches' , branchesRouter)
app.use('/api/cart', cartRouter);
app.use('/api/guest' , guestId);
app.use('/api/order' , orderRouter);
app.use('/api/paymob/checkout' , checkoutRouter)
app.use('/api/paymob' , paymobrouter);