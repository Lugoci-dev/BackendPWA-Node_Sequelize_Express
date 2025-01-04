const { Client } = require('pg');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('backend_node_expres', 'postgres', 'iD@n@02!s@@c', {
    host: '127.0.0.1',
    dialect: 'postgres',
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    } finally {
        await sequelize.close();
    }
}

testConnection();

// Admin
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sIjoxLCJpYXQiOjE3MzU4NDc3NjAsImV4cCI6MTczNTg1MTM2MH0.YJ8Y9tyWYRt4VGd9R_KKHwMV91xHEuzKxa04S3pRdyE// 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sIjoxLCJpYXQiOjE3MzU4NDg5NzgsImV4cCI6MTczNTg1MjU3OH0.W5pDoPcwvTijCLeAoHpkVtBYb65hjczM1tH4e_jrN5A

// Client
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sIjoyLCJpYXQiOjE3MzU4NDc4OTUsImV4cCI6MTczNTg1MTQ5NX0.SP1Te-nliS0byXIc9yu1nbIgacoa1IYrk7lt79w-lz8
