import express from "express";
import cors from "cors"
import "dotenv/config";

import mainrouter from "./routes/router.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())


app.use('/api',mainrouter);

app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API Tester server is running.' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});