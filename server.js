import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mysql from 'mysql2'; // Убедитесь, что используете правильный модуль
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0 
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }
    console.log('Подключение к базе данных установлено');
    connection.release(); // Освободить подключение после проверки
});


app.get('/tasks', (req, res) => {
    const query = `
        SELECT 
            Task.*, 
            TaskStatus.name AS statusName, 
            TaskStatus.colorHex AS statusColor,
            Project.shortTitle AS projectShortTitle,
            CONCAT(Employees.firstName, ' ', Employees.middleName, ' ', Employees.lastName) AS executiveEmployeeName
        FROM 
            Task 
        JOIN 
            TaskStatus 
        ON 
            Task.statusId = TaskStatus.id
        JOIN 
            Project
        ON 
            Task.projectId = Project.id
        JOIN
            Employees
        ON
            Task.executiveEmployeeId = Employees.id
    `;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Ошибка при выполнении запроса к базе данных:', error);
            res.status(500).json({ message: 'Ошибка при получении списка задач' });
            return;
        }
        res.json(results);
    });
});




const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

