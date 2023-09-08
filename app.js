const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Choose a port of your choice
const axios=require('axios')
require('dotenv').config();
// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with your client's domain for security
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const envAPIS=[];
const n=process.env.NKEYS;
for(let i=1;i<=n;i++) envAPIS.push(process.env['APIKEY'+i]);

function getRandAPI(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

app.get('/api', (req, res) => {
  const {q}=req.query;
  axios.get(`https://newsapi.org/v2/everything?q=${q}&language=en&sortBy=publishedAt&apiKey=${getRandAPI(envAPIS)}`)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json({ error: 'Proxy error' }));
});
app.get('/api/category',(req,res)=>{
  const {country,category}=req.query;
    axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${getRandAPI(envAPIS)}`)
    .then(response => res.json(response.data))
    .catch(error => res.status(500).json({ error: 'Proxy error' }));

});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
