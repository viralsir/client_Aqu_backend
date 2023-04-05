var express = require('express');
var router = express.Router();
// load the module and create the reference of mongodb module
let mongoClient = require("mongodb").MongoClient;
//url Details
let url ="mongodb://localhost:27017";
const dbName = 'Client_Aqu';
const collectionName = 'employee';

// connect the database

/* Rest API  : Http method
*   CRUD -- CREATE (POST), READ (GET),UPDATE(PUT) ,DELETE(DELETE)
* get -- > view or send all the records from the database.  (head/ url )
* post ---> create new record in database (inform must from client side) (body)
* delete --> delete record from database  (body)
* put -->  update the reocrd into database (body)
*
*  */


// get all records
router.get('/',(req, res) => {

    // Connect to the database
    mongoClient.connect(url, function(err, client) {
        if (err) throw err;

        // Specify the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Retrieve all documents from the collection
        collection.find({}).toArray(function(err, docs) {
            if (err) throw err;

            // Send the retrieved documents back as a response
            res.send(docs);

            // Close the database connection
            client.close();
        });
    });

})

// create a new document in database
router.post('/',(req, res) => {

    mongoClient.connect(url,(err,client)=> {
        if(!err){
            console.log("Connected")
            let db = client.db(dbName);

            db.collection(collectionName).insertOne(req.body,(err,result)=> {
                if(!err){
                    console.log("Record inserted successfully")
                    res.send("record inserted successfully");
                    //console.log(result);
                }else {
                    console.log(err);
                    res.send("error in inserting records");
                }
                client.close();
            })
        }else {
            console.log(err);
            res.send("error in inserting records")
        }

    })

})
// update the record
router.put('/',(req, res) => {

    mongoClient.connect(url,(err,client)=> {
        if(!err){
            console.log("Connected")
            let db = client.db(dbName);

            db.collection(collectionName).replaceOne({"_id":req.body._id},req.body,(err,result)=> {
                if(!err){
                    console.log("Record inserted successfully")
                    res.send("record inserted successfully");
                    //console.log(result);
                }else {
                    console.log(err);
                    res.send("error in inserting records");
                }
                client.close();
            })
        }else {
            console.log(err);
            res.send("error in inserting records")
        }

    })

})

// delete the record
router.delete('/',(req, res) => {

    mongoClient.connect(url,(err,client)=> {
        if(!err){
            console.log("Connected")
            let db = client.db(dbName);

            db.collection(collectionName).deleteOne({"_id":req.body._id},req.body,(err,result)=> {
                if(result.deletedCount>0){
                    res.send("Record deleted successfully")
                }else {
                    res.send("Record not present")
                }
                                client.close();
            })
        }else {
            console.log(err);
            res.send("error in inserting records")
        }

    })

})











module.exports = router;
