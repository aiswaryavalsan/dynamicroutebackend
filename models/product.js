const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if(this.id){
      getProductsFromFile(products=>{
        let index=products.findIndex(item=>item.id===this.id);
        console.log(this);
        products[index]=this;
       
        fs.writeFile(p,JSON.stringify(products),err=>{
          console.log(err)
        })
      })
    }
    else{
    this.id=Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static fetchById(id,cb){
      getProductsFromFile(products=>{
        const product=products.find(p=>p.id===id);
        cb(product);
      });
  }
  static deleteById(id){
    console.log(id);
    getProductsFromFile(products=>{
      const remaingProducts=products.filter(item=>item.id!=id);
      console.log(remaingProducts);
      fs.writeFile(p,JSON.stringify(remaingProducts),err=>{
        console.log(err);
      })
    })
  }
};
