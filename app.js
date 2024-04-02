const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors=require('cors');
const errorController = require('./controllers/error');
const sequelize=require('./util/database');
const User=require('./models/user');
const Product=require('./models/product');
const Cart=require('./models/cart');
const CartItem=require('./models/cartItem');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors());
const userRoutes=require('./routes/user')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { BelongsToMany } = require('sequelize');
//db.execute("SELECT * FROM products").then(result=>console.log(result)).catch(err=>console.log(err))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    User.findByPk(1).then(user=>
        {
            req.user=user;
        next();
    })
    .catch(err=>console.log(err));
  
})
app.use('/admin', adminRoutes);
app.use('/user',userRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.hasOne(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem})
sequelize.sync().then((result)=>{
    User.findByPk(1).then(user=>{
        if(!user){
            return User.create({name:'aish',email:'aish@gmail.com',phone:123456})
        }
        return user;
    }).then((user)=>{
     user.createCart();
    })
    .then(cart=>{
        app.listen(3000);
    })
   
}).catch((err)=>{console.log(err)})

