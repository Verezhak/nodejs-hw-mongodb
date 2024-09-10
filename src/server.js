import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';


const PORT = env('PORT', '3000');

export const setupServer = () => {
    const app = express();

    app.use(express.json());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );
    app.use(cors());




    app.use(contactsRouter);

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Route not found',
        });
        next();
    });


    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

