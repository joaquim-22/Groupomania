const express = require('express');
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./jwtUtils');
const {crud} = require('express-crud-router');
const {sequelizeCrud} = require('express-sequelize-crud');
const User = require('./models/users')
const Post = require('./models/posts')

const app = express();

const corsOptions = {
    origin:'http://localhost:3000',
    credentials: true
}

app.use(crud('/admin/*', sequelizeCrud(User, Post)))
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/Images', express.static('./Images'))
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.json(res.locals.user.id)
});

app.listen(3050);