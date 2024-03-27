const db=require('../util/database')
module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products(title,price,description,imageurl) VALUES(?,?,?,?)',[this.title,this.price,this.description,this.imageUrl])
   
  }
  static update(id,utitle, uimageUrl, udescription, uprice){
    return db.execute(
      'UPDATE products SET title=?, price=?, description=?, imageurl=? WHERE products.id=?',
      [utitle, uprice, udescription, uimageUrl, id]
  );
  }


  

  static fetchAll() {
    return db.execute('SELECT * from products');
   
  }
  static fetchById(id){
    return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
     
  }
  static deleteById(id){
    return db.execute('DELETE FROM products where products.id=?',[id]);
  }
};
