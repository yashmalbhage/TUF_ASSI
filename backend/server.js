// backend/server.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: '2p83Y1znjceF1x7.root',
    password: '5WkycfDj39zQCgFf',
    database: 'test',
});

app.get('/api/banner', async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM banner LIMIT 1');
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching banner data' });
    }
});

app.post('/api/banner', async(req, res) => {
    const { isVisible, description, link } = req.body;
    try {
        await pool.query(
            'UPDATE banner SET isVisible = ?, description = ?, link = ?', [isVisible, description, link]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error updating banner data' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));