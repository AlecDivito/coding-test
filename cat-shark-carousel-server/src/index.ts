import path from 'path';
import express, { Application, NextFunction, Request, Response } from 'express';
import { catsList, sharksList } from './database';
import { shuffle } from './util';

const app: Application = express();
const port = process.env.PORT || 3000;

enum PhotoTypes {
    SHARK = "SHARK",
    CAT = "CAT",
};

const mapping = {
    [PhotoTypes.SHARK]: sharksList,
    [PhotoTypes.CAT]: catsList,
}

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

app.get('/photos', (req: Request, res: Response) => {
    let photoTypes: undefined | string | string[] = req.query.types as string[];
    if (!photoTypes) {
        photoTypes = [];
    } else if (!Array.isArray(photoTypes)) {
        photoTypes = [photoTypes];
    }
    const photoList = photoTypes.filter((value) => Object.values(PhotoTypes).includes(value as PhotoTypes))
        .map((value) => mapping[value as PhotoTypes])
        .flat();

    shuffle(photoList);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(photoList).send();
})

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log(`Running server on localhost:${port}`)
app.listen(port);