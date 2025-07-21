const express = require('express');
const cors = require('cors');
const menuRouter = require('./routes/menuRouter')
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
     origin: 'http://localhost:5173'
   }));
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)    
})
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/api/menu' , menuRouter)
