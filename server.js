const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config').mongoURI;
const mongoose = require('mongoose');
const passport = require('passport');
const users = require('./app/controllers/users');
mongoose.Promise = global.Promise;

//Conneting to database
mongoose
  .connect(dbConfig)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//create express api
const app = express();

//parse requests for content type
app.use(bodyParser.urlencoded({ extended: false }));

//parse requests for content type
app.use(bodyParser.json());

//defining simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EasyNote App.' });
});

//Passport midleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Use Routes
app.use('/app/controller', users);

//Require Notes routes
require('./app/routes/note.routes')(app);

//listen for requests
app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
