const keys = require('./keys')



// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));


// Postgress Client SetUp
const { Pool } = require('pg')

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
    // ssl: 
    //     process.env.NODE_ENV !== 'production'
    //     ? false
    //     : {rejectUnauthorized : false}
});

pgClient.on("connect", (client) => {
    client
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch((err) => console.error(err));
});


// Redis Client Setup
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();


// Express route handlers

app.get('/', (req, res) => {

    res.send('hi')
});

app.get('/values/all', async (req, res) => {
    try {
        const values = await pgClient.query('SELECT * from values');
        console.log('CARLOS2_VALUES', values);

        res.json({ status: true, message: '', data: values.rows })
    } catch (error) {
        console.log('CARLOS2',error);

        res.status(500).json({ status: false, message: error.message, data: '' });
    }
});


app.get('/values/current', async (req, res) => {
    try {
        
        redisClient.hgetall('values', (err, values) => {
            res.json({ status: true, message: '', data: values })
        });
    } catch (error) {
        console.log('CARLOS2',error);
        res.status(500).json({ status: false, message: error.message, data: '' });
    }
});

app.post('/values', async (req, res) => {
    try {
        
        const index = req.body.index;
    
        if(parseInt(index) > 40){
            return res.status(422).send('Index too high');
        }
    
        redisClient.hset('values', index, 'Nothing yet');
        redisPublisher.publish('insert', index);
    
        pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
        
        res.json({ status: true, message: '', data:'' })
       

    } catch (error) {
        console.log('CARLOS2',error);
        res.status(500).json({ status: false, message: error.message, data: '' });
    }
    
});

app.listen(5000, err => {
    console.log('Listening');
})





