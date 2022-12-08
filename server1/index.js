const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const upload = require('express-fileupload')
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());    
app.use(upload());

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'arun9629',
    database:'empdbms'
})

con.connect((err)=>err?console.log(err):console.log('DATABASE CONNECTED'));

app.post('/details',(request,response)=>{
    const fname=request.body.fname
    const lname=request.body.lname
    const dob=request.body.dob
    const email=request.body.email
    const education=request.body.education
    const location=request.body.location
    const about=request.body.about

    const sql='insert into empdbms.details(fname,lname,dob,email,education,location,about) values (?,?,?,?,?,?,?)';

    con.query(sql,[fname,lname,dob,email,education,location,about],(err,res)=>{
        if(err){
            let s = {'status':'Error'}
            response.send(s);
        }else{
            let s = {'status':'insert'}
            response.send(s);
        }
    })
})

app.get('/view',(request,response)=>{
    const sql='select * from empdbms.details'
    con.query(sql,(err,res)=>{
        if(err){
          console.log(err);
        }
        else{
            response.send(res);
        } 
    });
});

app.delete('/delet/:id',(request,response)=>{

    let id = request.params.id;

    let sql = 'DELETE from empdbms.details where id=?';

    con.query(sql,id,(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            let s = {'status':'deleted'}
            response.send(s);
        }
    });
});

app.put('/updat',(request,response)=>{

    const fname=request.body.fname
    const lname=request.body.lname
    const dob=request.body.dob
    const email=request.body.email
    const education=request.body.education
    const location=request.body.location
    const about=request.body.about
    const id=request.body.usid;

        let sql = `update empdbms.details set fname=?,lname=?,dob=?,email=?,education=?,location=?,about=? where id=${id}`;
    
        con.query(sql,[fname,lname,dob,email,education,location,about],(err,res)=>{
            if(err){
                let s={"status":"err"}
                response.send(s);
            }
            else{
                let s={"status":"updated"};
                response.send(s);
            }
        })
    })

    app.get('/editview/:usd',(request,response)=>{     
        let id = request.params.usd;
        let sql=`select * from empdbms.details where id=${id}`

        con.query(sql,(err,res)=>{
            if(err){
              console.log(err);
            }
            else{
                response.send(res);
            } 
        });
    });



app.listen(5000);