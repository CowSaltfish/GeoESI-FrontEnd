const express = require('express');
const cors = require('cors');

const testRouter = require('./routes/test.js');
const filePostRouter = require('./routes/filepost.js');
const ontoCreateRouter = require('./routes/ontocreate.js');
const ontoSaveRouter = require('./routes/ontosave.js');
const ontoDeleteRouter = require('./routes/ontodelete.js');
const ontoOpenRouter = require('./routes/ontoopen.js');
const setOntoOpenRouter = require('./routes/setontoopen.js');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/test/', testRouter);
app.use('/file/', filePostRouter);
app.use('/ontocreate/', ontoCreateRouter);
app.use('/ontosave/', ontoSaveRouter);
app.use('/ontodelete/', ontoDeleteRouter);
app.use('/ontoopen/', ontoOpenRouter);
app.use('/setontoopen/', setOntoOpenRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000.")
});