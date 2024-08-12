const mysql = require('mysql2/promise');

const connectionString = 'mysql://2p83Y1znjceF1x7.root:OnxilLjc6rJQyvnU@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/test?ssl={"rejectUnauthorized":true}';

let pool;

const initializeDbConnection = async() => {
    if (!pool) {
        try {
            pool = mysql.createPool(connectionString);
            console.log('Database connection pool created successfully');
            const connection = await pool.getConnection();
            console.log('Successfully connected to the TiDB Cloud database');
            connection.release();
        } catch (error) {
            console.error('Error initializing database connection:', error);
            process.exit(1);
        }
    }
};

module.exports = async(req, res) => {
    await initializeDbConnection();

    if (req.method === 'GET') {
        try {
            console.log('Attempting to fetch banner data...');
            const [rows] = await pool.query('SELECT * FROM banner LIMIT 1');
            console.log('Banner data fetched:', rows);

            if (rows.length === 0) {
                console.log('No banner data found, returning default object');
                return res.json({ isVisible: false, description: '', link: '', timer: 0 });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error('Database error when fetching banner:', error.message);
            res.status(500).json({ error: 'Error fetching banner data', details: error.message });
        }
    } else if (req.method === 'POST') {
        const { isVisible, description, link, timer } = req.body;
        try {
            console.log('Attempting to update banner data:', { isVisible, description, link, timer });
            const result = await pool.query(
                'UPDATE banner SET isVisible = ?, description = ?, link = ?, timer = ? WHERE id = 1', [isVisible, description, link, timer]
            );
            console.log('Update result:', result);
            res.json({ success: true });
        } catch (error) {
            console.error('Database error when updating banner:', error.message);
            res.status(500).json({ error: 'Error updating banner data', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};