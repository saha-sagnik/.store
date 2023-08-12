const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const port = 4500 || process.env.PORT;

const User = require('./user');

// Set up session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb+srv://sbmunnu:munnu@mongo.mzaad3h.mongodb.net/wallmart?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectToMongoDB();

async function addListItem(userId, proId, quantity) {
    try {
        const user = await User.findById(userId);
        if (user) {
            user.list.items.push({
                proId: proId,
                quantity: quantity
            });
            await user.save();
            console.log("Added item to list:", proId);
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.log(error.message);
    }
}


async function add(info) {
  console.log(info);
  const user = new User({
    name: info.signup_name,
    email: info.signup_mail,
    password: info.signup_password1,
  });
  user.save()
    .then(() => {
      console.log("Saved");
    }).catch((error) => {
      console.log(error.message);
    });

    addListItem('64d21667d50342818794e187')
}

async function check(name, password) {
  try {
    const user = await User.findOne({ name: name });
    if (user && password === user.password) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "projects"));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  if (req.body.login_name) {
    try {
      const isAuthenticated = await check(req.body.login_name, req.body.login_password);
      if (isAuthenticated) {
        req.session.user_name = req.body.login_name; // Store user_name in session
        console.log("User logged in:", req.session.user_name);
        res.redirect('/');
      } else {
        console.log('Wrong username or password');
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    add(req.body);
    res.redirect('/login');
  }
});

app.get('/product', (req, res) => {
  res.render('product');
});

app.get('/api/data', (req, res) => {
  const user_name = req.session.user_name; // Retrieve user_name from session
  res.json(user_name);
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
