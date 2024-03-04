const mongoose = require("mongoose");

const myBudgetSchema = new mongoose.Schema({
    
    title: {
        type: String,
        trim: true,
        required: true,
    },
    relatedValue: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        match: /^#[A-Fa-f0-9]{6}$/i,
    },
}, { collection: 'myBudget'})

module.exports = mongoose.model('myBudget', myBudgetSchema)