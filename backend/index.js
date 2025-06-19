const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // library to fetch data client to server , its add in middleware 
const cors = require('cors'); // its allow to request from client to server by different port
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const UserRouter = require('./Routes/UserRouter');
const path = require("path");
const AdminRouter = require("./Routes/AdminRouter")
const CartRouter = require('./Routes/CartRouter');
const settingsRoutes = require('./Routes/settingsRoutes');
require('dotenv').config();
require('./Config/db');

const PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'assets/uploads')));
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use("/admin", AdminRouter);
app.use('/cart', CartRouter);
app.use('/settings', settingsRoutes);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

