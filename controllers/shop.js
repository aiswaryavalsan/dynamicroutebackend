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
  req.user.getCart().then(cart=>{return cart
    .getProducts()
    .then(products=>{
       res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products:products
  });
    })
  }).catch(err=>console.log(err))
 
};
exports.postCart=(req,res,next)=>{
  const id=req.body.id;
  let fetchedCart;
  let product;
  req.user.getCart()
  .then(cart=>{
    fetchedCart=cart;
    return cart.getProducts({where:{id:id}})
  })
  .then(products=>{
   
    if(products.length>0){
      product=products[0];
      //product.cartItems.quantity+1;
    }
   let newQunantity=1;
   if(product){
    let old=product.cartItem.quantity
    newQunantity+=old;
    //console.log(old);
   
    console.log(fetchedCart)
    return fetchedCart.addProduct(product,{through:{quantity:newQunantity}});

   }
   return Product.findByPk(id)
   .then(product=>{
     return fetchedCart.addProduct(product,{through:{quantity:newQunantity}})
   })
   .catch(err=>console.log(err));
   
   
  })
  .then(()=>{res.redirect('/cart')})
  .catch(err=>console.log(err))
  
}
exports.postDeleteProduct=((req,res,next)=>{
  const pid=req.body.productId;
  req.user.getCart().then((cart)=>{
    return cart.getProducts({where:{id:pid}});
  })
  .then((products)=>{
  let product=products[0];
    product.cartItem.destroy()
  })
  .then((result)=>{res.redirect('/cart')})
  .catch(err=>console.log(err))
})
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
