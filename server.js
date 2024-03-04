const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;
const config = require('./jsonData.json');
const mongoose = require("mongoose");
const myBudgetModel = require('./models/myBudget_schema');

let url = 'mongodb://localhost:27017/mongodb_demo';

/*const budget = {
    myBudget: [
    {
        title: 'Eat out',
        budget: 40
    },
    {
        title: 'Rent',
        budget: 270
    },
    {
        title: 'Groceries',
        budget: 80
    },
    ]
};*/

console.log("use Cors ");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static('public'));

/*app.get('/hello', (req, res) => {
    res.send('Hello World!');
});*/
var database
async function getMyBudget(){
    const client = new mongoDBClient(url);
    try{
        await client.connect();
        console.log("Connection created");
        database = client.db();
    }catch(e){
        console.error("Error : " + e);
    }finally{
        //await client.close();
        console.log("connection closed");
    }
}


app.get('/budget', (req, resp) => {
    var budget; 
    myBudgetModel.find({}).then((res) => {
        budget = res;
        console.log("Budget from model: " + budget);
        resp.json(budget);
        //mongoose.connection.close();
    }).catch((connectionError) => { 
            resp.status(500).json("Internal Server Error");
            console.log(connectionError);
        });
});

app.post('/addBudget', (req, resp) => {
    myBudgetModel.insertMany(req.body).then((res) => {
        resp.status(200).json(req.body);
    }).catch((connectionError) => { 
        resp.status(201).send("Invalid format"); 
        console.log(connectionError); 
    });
})

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
    //getMyBudget().catch(console.error);
    mongoose.connect(url)
        .then(() => {
            console.log("connected to db");
        })
        .catch((connectionError) => {console.log(connectionError)})
});

