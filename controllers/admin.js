const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    edit:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({title:title,
    price:price,
    description:description,
    imageUrl:imageUrl
  }).then(result=>res.redirect('/admin/products')).catch(err=>console.log(err))
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products=>{res.render('admin/products', {
    prods: products,
    pageTitle: 'admin Products',
    path: '/admin/products'
  });}).catch(err=>console.log(err))

 };
exports.getEditProduct = (req, res, next) => {
const editMode=req.query.edit;
console.log(editMode)
Product.findByPk(req.params.id).then(product=>{
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    edit:editMode,
    product:product
  });

})
  
  
};
exports.postEditProduct=(req,res,next)=>{
const id=req.body.id;
const utitle = req.body.title;
  const uimageUrl = req.body.imageUrl;
  const uprice = req.body.price;
  const udescription = req.body.description;
  Product.findByPk(id).then(product=>{
    product.title=utitle;
    product.imageUrl=uimageUrl;
    product.price=uprice;
    product.description=udescription;
   return product.save()
  })
  .then(()=>{console.log('updated');
    res.redirect('/admin/products')
  })
  .catch((err)=>console.log(err))
  
}
exports.postDeleteProduct=(req,res,next)=>{
  const id=req.body.id;
  console.log("id",id);
  Product.findByPk(id)
  .then(product=>{
  return product.destroy();
  })
  .then(()=>{console.log("distroyed") ;
  res.redirect("/admin/products")})
  .catch(err=>console.log(err));
 
}