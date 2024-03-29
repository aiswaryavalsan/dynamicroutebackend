const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors=require('cors');
const errorController = require('./controllers/error');
const sequelize=require('./util/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors());
const userRoutes=require('./routes/user')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//db.execute("SELECT * FROM products").then(result=>console.log(result)).catch(err=>console.log(err))

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use('/user',userRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
sequelize.sync().then((result)=>{
    app.listen(3000);
}).catch((err)=>{console.log(err)})

