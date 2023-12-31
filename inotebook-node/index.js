const connectToMongoDB = require("./mongoDbConn");
const express = require('express')
const cors = require('cors')

connectToMongoDB();

const app = express()
const port = 4000

let corsOptions = {
    origin: ['http://localhost:3000'],
}

app.use(cors(corsOptions))
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use('/api/notes', require("./routes/note"));

app.listen(port, () => {
    console.log(`iNotebook app listening on port http://localhost:${port}`)
})