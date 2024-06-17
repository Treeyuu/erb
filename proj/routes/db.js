var express = require('express');
var router = express.Router();

/* create db entries. */
//引入模塊
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
                        //async(req,res,next) =>
router.get('/create', async function(req, res, next) {
    try {
        //每一次用都要connect
        await client.connect();
        const db = client.db("school");  // use school
        const kln = db.collection("kowloon");
        await kln.insertOne({sid: "1",Type: "Notebook",Quantity:"5"});
        await kln.insertMany([
            {sid: "2",Type: "Printer",Quantity: "4"},
            {sid: "3",Type: "Mouse",Quantity: "8"}
        ]);

        //insert完要send
        res.send("Done");
    } finally {
        //每一都要closs
        await client.close();
    }
}).get('/search',async(req,res,next) =>{
    try{
        await client.connect();
        const kln =client.db("school").collection("kowloon"); //use kowloon of school
        let data=kln.find({Type:'Printer'}), cnt=0;
        for await(const d of data){
            console.log(d);
            cnt++;
        }
        if(cnt==0) res.send("no record found");
        else res.send(cnt + "records found")

    }finally{
        await client.close();
    }
});

module.exports = router;

