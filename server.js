
const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;
const config = require('./jsonData.json');

const budget = {
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
};

console.log("use Cors ");
app.use(cors());

/*app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});*/


app.get('/budget', (req, res) => {
    console.log("budget is : " + budget);
    res.json({
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
    });
    //res.json(config);  
});
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
});