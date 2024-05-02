
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

// middlewere

app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qu4ehcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();





        const servicesCollection = client.db('carDoctor').collection('services');
        const bookingCollection = client.db('carDoctor').collection('bookings');



        // services
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find()
            const result = await cursor.toArray();
            res.send(result)

        })



        // bookings
        app.post('/bookings', async (req, res) => {
            const booking = req.body;

        })


        // home card ar id btn dia find kora

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const quary = { _id: new ObjectId(id) }

            const options = {

                // Include only the `title` and `imdb` fields in the returned document
                projection: { title: 1, price: 1, service_id: 1 },
            };




            const result = await servicesCollection.findOne(quary, options)
            res.send(result)


        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('car doctore is running')
})

app.listen(port, () => {
    console.log(`car doctore is running on port ${port}`)
})