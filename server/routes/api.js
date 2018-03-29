const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/epsilontelemetrydb';


/**
 * Get API Listing
 * 
 * Return a list of the API routes here for easier usage
 */
router.get('/', (req, res) => {
  res.send('HTTP GET => /api/packet to get data');
});

/**
 * GET /api/packet
 * 
 * For now, return all data from database. Possibly specify
 * time window to only return recent results for a race
 */
router.get('/packet', (req, res, next) => {
    const results = []
    pg.connect(connectionString, (err, client, done) => {
        // handle unable to connect to database
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, error_msg: err })
        }
        
        const query = client.query('SELECT * FROM packet ORDER BY id ASC;');
        
        query.on('row', (row) => {
            results.push(row);
        });

        query.on('end', () => {
            done();
            return res.json(results);
        })
    })
});

module.exports = router;