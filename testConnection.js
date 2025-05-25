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
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sIjoxLCJpYXQiOjE3MzYwMTQwNTQsImV4cCI6MTczNjAxNzY1NH0.Oww4u1sMk9C5e4U2vztszwf9Mf8If_GwMiapzVMSDnc

// Client
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sIjoyLCJpYXQiOjE3MzYwMTQwOTcsImV4cCI6MTczNjAxNzY5N30._udFcnbX0Qu1Gdg-Mag5GZJJ21XgBCK_K9KSdGuIqiY

// Has un listado de los requisitos de la guia proporcionada(en el orden q aparece), junto a este una explicacion del mismo detallada, luego si ha sido implementado o no, si fue implementado una explicacion de como funciona y por que se considera que cumple el requisito