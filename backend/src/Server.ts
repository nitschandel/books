import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import logger from '@shared/Logger';
import cors from 'cors';

import { database } from '@database';
import { ObjectId } from 'bson';

const bookMockData = require('./books.json');

const app = express();
const { BAD_REQUEST, OK } = StatusCodes;

export interface Game {
    name: string;
    rom: string;
    image: string;
    players: string;
    like?: number
}

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}


// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.get('/books', async (req: Request, res: Response) => {
    const bookListCollection = database.client.db('book-db').collection('book-list');
    let bookList = await bookListCollection.find().toArray();

    if (bookList.length === 0) {

        await database.client.db('book-db').collection('book-list').insertMany(bookMockData);
        bookList = await bookListCollection.find().toArray();
    }

    res.status(OK).json(bookList);
});

app.get('/books/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const o_id = new ObjectId(id);
        const bookListCollection = database.client.db('book-db').collection('book-list');

        const book = await bookListCollection.findOne({
            _id: o_id
        }, {
            fields:
            {
                title: 1,
                pageCount: 1,
                longDescription: 1,
                publishedDate: 1,
                authors: 1,
                isbn: 1,
                thumbnailUrl: 1
            }
        });

        res.status(OK).json({ book });
    } catch (e) {
        res.status(BAD_REQUEST).json({ message: "Record does not exist for the given id" });
    }

});



// Export express instance
export default app;
