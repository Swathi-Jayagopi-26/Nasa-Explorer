require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apodRouter = require('./routes/apod');
const marsRouter = require('./routes/mars');
const neoRouter = require('./routes/neo');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/apod', apodRouter);
app.use('/api/mars', marsRouter);
app.use('/api/neo', neoRouter);

app.get('/', (req, res) => res.json({ok: true, version: 'NASA Explorer Backend'}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
