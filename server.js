const express = require('express');

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
];

//endpoints
app.get('testimonials', (req, res) => {
  res.json(db);
});

app.get('testimonials/:id', (req, res) => {
  res.json(db.find((data) => data.id == req.params.id));
});

app.get('testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

app.post('testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuid();

  const newObject = {
    id: id,
    author: author,
    text: text,
  };

  db.testimonials.push(newObject);
  res.json({ message: 'Ok' });
});

// app.put('/testimonials/:id', (req, res) => {
//   const id = req.params.id;
//   const findItem = db.testimonials.find((data) => data.id == req.params.id);
//   const index = db.testimonials.indexOf(findItem);
//   const { author, text } = req.body;
//   const changeItem = {
//     id: id,
//     author: author,
//     text: text,
//   };

//   res.json({ message: 'Ok' });
// });

app.delete('/testimonials/:id', (req, res) => {
  const item = db.testimonials.find((data) => data.id == req.param.id);
  const index = db.testimonials.indexOf(item);

  db.testimonials.splice(index, 1);
  res.json({ message: 'Ok' });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
