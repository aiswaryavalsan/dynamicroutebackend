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
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
exports.getEditProduct = (req, res, next) => {
const editMode=req.query.edit;
console.log(editMode)
Product.fetchById(req.params.id,(product)=>{
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
  const product = new Product(id,utitle, uimageUrl, udescription, uprice);
  product.save();
  res.redirect('/');
  
}