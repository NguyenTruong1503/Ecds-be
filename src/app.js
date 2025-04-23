const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const regionRoutes = require('./routes/region.routes');
const hospitalRoutes = require('./routes/hospital.routes');
const productRoutes = require('./routes/product.routes');
const agentRoutes = require('./routes/agent.route');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/regions', regionRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/products', productRoutes);
app.use('/api/agents', agentRoutes);

module.exports = app;
