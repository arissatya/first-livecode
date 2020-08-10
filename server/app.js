const express = require('express')
const app = express()
const cors= require('cors')
const index = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/', index)

const PORT = 3000
app.listen(PORT, ()=>{
  console.log(`online port: ${PORT}`);
})