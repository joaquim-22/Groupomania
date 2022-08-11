const express = require('express');
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./jwtUtils');
const {crud} = require('express-crud-router');
const {sequelizeCrud} = require('express-sequelize-crud');
const User = require('./models/users')

const app = express();

const corsOptions = {
    origin:'http://localhost:3000',
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false 
}

app.use(crud('/admin', sequelizeCrud(User)))
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/Images', express.static('./Images'))
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.json(res.locals.user.id)
});

app.listen(3050);