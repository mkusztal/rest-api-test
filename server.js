const express = require('express');
const cors = require('cors');
const app = express();

//import endpoints
const testimonials = require('./routes/testimonials.routes');

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', testimonials);

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
