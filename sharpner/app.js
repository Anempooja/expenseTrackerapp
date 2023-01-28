const path = require('path');

const express = require('express');
//const dotenv=require('dotenv')

const bodyParser = require('body-parser');

var cors = require('cors')
const Expense=require('./ExpenseAppModels/expense')
const User=require('./ExpenseAppModels/user')
const Order=require('./ExpenseAppModels/orders')
const forgotPasswordRequests=require('./ExpenseAppModels/forgotPasswordRequests')


const userRoutes=require('./ExpenseAppRoutes/signUp')
const expenseRoutes=require('./ExpenseAppRoutes/addexpense')
const purchaseRoutes=require('./ExpenseAppRoutes/purchase')
const forgotPasswordRoutes=require('./ExpenseAppRoutes/forgotPassword')
const errorController = require('./controllers/error');

const sequelize=require('./ExpenseAppUtil/database');
User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(forgotPasswordRequests)
forgotPasswordRequests.belongsTo(User)

const app = express();
//dotenv.config()

app.use(cors())
app.use(bodyParser.json());
app.use('/user',userRoutes)
app.use('/expense',expenseRoutes)
app.use('/purchase',purchaseRoutes)
app.use('/forgotPassword',forgotPasswordRoutes)
sequelize.sync()
.then(()=>{
    app.listen(4000)
})
.catch(err=>console.log(err));