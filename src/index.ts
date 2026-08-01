import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import { PORT, sequelize, logger, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from './config';
import apiRoutes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.get('/health', (req: Request, res: Response) => {
    return res.status(200).json({
        status: 'ok',
        service: 'Flights-Service',
        timestamp: new Date().toISOString(),
    });
});

async function ensureDbExists() {
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await connection.end();
}

app.listen(PORT, async () => {
    console.log(`Successfully started the Flight Service server on PORT : ${PORT}`);
    logger.info(`Flight-Service started on PORT ${PORT}`);
    try {
        await ensureDbExists();
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Database connected and synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to database:', error);
        logger.error(`Database connection error: ${error}`);
    }
});
