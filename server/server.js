const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api', (req, res) => {
  // console.log('Got body:', req.body);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send('Received your HTTP Post!');
  console.log(req.body.prompts.answers.name);
  console.log(req.body.prompts.answers.phone);
  console.log(req.body.prompts.answers.email);

  // Call API to insert into the customer list
  const formData = {
    name: req.body.prompts.answers.name,
    email: req.body.prompts.answers.email,
    phone: req.body.prompts.answers.phone,
  };

  axios.post(`http://localhost:5000/customers`, formData).then((data) => [
    setTimeout(() => {
      //this.props.history.push('/');
    }, 1500),
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
