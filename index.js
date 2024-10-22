const express=require('express');
const app=express();
const path=require('path');
const userModel = require('./Modals/user')
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const { name } = require('ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('index123');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.get('/createuser',(req,res)=>{
    res.render('signup');
})


app.post('/create',(req,res)=>{
    let{name,password}=req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            const user = await userModel.create({
                name,
                password:hash
                
            })
        });
    });
    
    res.redirect('/login');
})

app.post('/logincheck',async(req,res)=>{
    let user=await userModel.findOne({name:req.body.name})
    if(!user){
        res.send('check you email and password')
    }
    else{
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(result){
                let token=jwt.sign({email:user.email},"aabbcc")
                res.cookie('token',token);
                res.render('index123',{user});
            }
            else{
                res.send("check your email and password");
            }
        })
    }
    
})

app.get('/maker', (req, res) => {
    res.render('project1')
})

function loginCheck() {

}
app.listen(3000);