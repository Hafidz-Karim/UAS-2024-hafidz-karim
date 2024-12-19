import { Pool } from "pg";
import * as dotenv from  "dotenv";
import { Router } from "express";

dotenv.config();

const pool = new Pool({
    user: "postgres.xajgqatmlarqhwqairwn",
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    password: "Sandbox*12345",
    database: "postgres",
    port: 6543
});

const router = Router();

interface tasks {
    task_id: number,
    user_id: number,
    title_task: string,
    description: string,
    deadline: Date,
    is_completed: boolean,
    created: Date,
    updated: Date
}

// Create
router.post('/api/tasks', async (req, res) => {
    try {
        const { title_task, description, deadline, is_completed, created, updated }: any =  req.body;
        const query = `INSERT INTO tasks(title_task, desription, deadline is_completed, created,updated)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING * `;
        const values = [title_task, description, deadline, is_completed, created, updated]; 
        const result = await pool.query(query, values); 
        res.json({ status: 'success', data: result.rows[0] }); 
    }
    catch (err:any) {
        res.status(500).json({ status: 'error', message: err.message});
    }
})

// get all reqords
router.get('api/tasks', async(req , res) => {
    try {
        const result = await pool.query('SELECT * from tasks');
        res.json({ status: 'success', data: result.rows }); 
    }
    catch (err:any) {
        res.status(500).json({ status: 'error', message: err.message }); 
    }
})

export default router;

