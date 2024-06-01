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

const connection = mysql.createConnection({
    host: 'kolei.ru',
    user: 'akropinov',
    password: '171288',
    database: 'akropinov'
});

connection.connect(function(err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
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

    connection.query(query, (error, results) => {
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

