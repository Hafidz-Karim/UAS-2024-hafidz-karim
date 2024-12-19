import express from "express";
import pool from "./routes/management_tasks";

const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server berjalan di port 3000');
    
})
