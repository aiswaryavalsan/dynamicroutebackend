const Product = require('../models/product');
const Cart=require('../models/cart')
exports.getProducts = (req, res, next) => {
  Product.findAll().then(products=>{res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  });}).catch(err=>console.log(err))
};
exports.getOneProduct=(req,res,next)=>{
  const pid=req.params.productId;
  //console.log(pid)
   Product.findByPk(pid).then((product)=>{ res.render('shop/product-detail',{product:product,pageTitle:'product',path:'/products'})
  }).catch(err=>console.log(err))
   
  
  

}

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products=>{

     {res.render('shop/index', {
        prods:products,
        pageTitle: 'Shop',
        path: '/'
      });}

  }).catch(err=>console.log(err))
    
  
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};
exports.postCart=(req,res,next)=>{
  const id=req.body.id;
  Product.fetchById(id,product=>{
    Cart.addProdutToCart(id,product.price)
  })
  // console.log(id)
  res.redirect('/cart')
}
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
