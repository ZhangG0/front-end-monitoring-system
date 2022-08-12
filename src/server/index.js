const express = require('express');
const app = express();

app.get('/api/getList',(req,res)=>{
    res.send('Hello')
})
app.listen('8088', () => {
    console.log('8088');
  });