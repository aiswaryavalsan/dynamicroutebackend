const fs=require('fs');
const path=require('path');
const rootpath=require('../util/path');
const p=path.join(rootpath,'data','cart.json');
module.exports=class cart{
    static addProdutToCart(id,productprice){
        let cart={product:[],totalPrice:0}
        fs.readFile(p,(err,data)=>{
            console.log("3");
            if(!err){
                cart=JSON.parse(data);
            }
            const existingProductIndex=cart.product.findIndex(prod=>prod.id===id);
            console.log(existingProductIndex);
            let updatedProduct;
            if(existingProductIndex>=0){
                console.log("1");
                const existingProduct=cart.product[existingProductIndex];
                updatedProduct={...existingProduct};
                updatedProduct.quantity=updatedProduct.quantity+1;
                cart.product=[...cart.product]
                cart.product[existingProductIndex]=updatedProduct;

                }
                else{
                    console.log("2")
                    updatedProduct={id:id,quantity:1}
                    cart.product=[...cart.product,updatedProduct];
                }
                cart.totalPrice=cart.totalPrice+ +productprice
                fs.writeFile(p,JSON.stringify(cart),err=>{
                    console.log(err);
                })
            })

        }
    }

