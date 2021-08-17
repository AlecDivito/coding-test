import path from 'path';
import express, { Application, Request, Response } from 'express';
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

app.get('/photos', (req: Request, res: Response) => {
    const photoType: string[] = req.query.photo as string[];
    const photoList = photoType.filter((value) => Object.values(PhotoTypes).includes(value as PhotoTypes))
        .map((value) => mapping[value as PhotoTypes])
        .flat();
    if (photoList.length === 0) {
        return "error";
    }
    const shuffled = shuffle(photoList);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shuffled);
})

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);