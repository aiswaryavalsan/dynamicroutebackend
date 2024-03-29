const User=require('../models/user');
exports.addUser=(req,res,next)=>{
    console.log(req.body)
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
     User.create({name:name,email:email,phone:phone}).then((data)=>{
        console.log(data);
        res.status(201).json({userdetails:data})

        })
   
}
exports.getaddUser=(req,res,next)=>{
    User.findAll()
    .then((data)=>{res.json(data)})
    .catch(err=>console.log(err));

}
exports.postDeleteUser=(req,res,next)=>{
    console.log("delete")
    User.findByPk(req.params.id).then(data=>{
         return data.destroy();
    })
       .then(()=>{ res.status('200').json("succeffully deleted user")}) 
         
    .catch(err=>console.log(err))
   
  
}