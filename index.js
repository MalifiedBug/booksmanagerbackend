import { MongoClient, ObjectId } from "mongodb";
import cors from 'cors'
// const express = require("express"); // "type": "commonjs"
import express, { response } from "express"; // "type": "module"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { ObjectID } from "bson";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL;

//environment variables


//connect mongodb

async function MongoConnect(){
    const client = await new MongoClient(MONGO_URL).connect();
    console.log('Mongo Connected')
    return client;
}

const client = await MongoConnect();

app.get("/", function (request, response) {
  response.send("🙋‍♂️ Welcome to Weather App");
});

app.get('/test', async (req,res)=>{
    res.send('book route testing!')    
})

app.get('/allbooks', async (req,res)=>{
    try {
        let books = await client.db("BooksApp").collection("Books").find({}).toArray();
        if(books){
            res.status(200).send(books)
        }else{
            res.status(200).send({msg:"no books found, add books"})
        }
    } catch (error) {
        res.status(404).send(error)        
    }
})

app.get("/book/:id", async(req,res)=>{
    const id = req.params.id
    try {

        const book =  await client.db("BooksApp").collection("Books").findOne({_id:ObjectId(id)})
        if(book){
            res.status(200).send(book)
        }else{
            res.status(200).send({msg:"no book found"})
        }
        
    } catch (error) {
        res.status(404).send(error)        
    }})

app.post("/postbook", async (req,res)=>{
    
    try {
        const insertBook = await client.db("BooksApp").collection("Books").insertOne(req.body)
    if(insertBook){
        res.status(200).send(insertBook)
    }else{
        res.status(200).send(insertBook)
    }
        
    } catch (error) {
        res.status(404).send(error)        
    }})

app.put("/updatebook/:id", async(req,res)=>{
    try {
        const id = req.params.id;        
        const updateBook = await client.db("BooksApp").collection("Books").updateOne({_id:ObjectId(id)},{$set:req.body})
        res.status(200).send(updateBook)        
    } catch (error) {
        res.status(404).send(error)        
    }})

app.delete("/deletebook/:id", async (req,res)=>{
    try {
        const id = req.params.id
        const deleteBook = await client.db("BooksApp").collection("Books").deleteOne({_id:ObjectId(id)})
        res.status(200).send(deleteBook)
        
    } catch (error) {
        res.status(404).send(error)        
    }})


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

//package.json



//hashing password


// async function hashedPassword(password){
//    const NO_OF_ROUNDS = 10;
//    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
//    const hashedPassword = await bcrypt.hash(password,salt);
//    return hashedPassword;
// }

// //sign jwt

// var token = jwt.sign({ email: email }, process.env.JWT_SECRET);

// //compare with bcrypt

//         const isSame = await bcrypt.compare(password,userdb.password);


// //jwt middleware

// import jwt from 'jsonwebtoken'

// export const auth = (request,response, next)=>{
//     const token = request.header("x-auth-token");
//     console.log("token", token)
//     jwt.verify(token,process.env.JWT_SECRET)
//     next();
// }












