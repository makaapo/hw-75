import express from 'express';
import cors, {CorsOptions} from 'cors';
import {vigenereCipher} from './vigenere';

const app = express();
const port = 8000;

const whitelist = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin && whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));
app.use(express.json());


app.post('/encode', (req, res) => {
    const {password, message} = req.body;
    try {
        const encoded = vigenereCipher(message, password, true);
        res.json({encoded});
    } catch (e) {
        console.error('Error while encoding:', e);
        res.status(500).send('error while encoding the message');
    }
});

app.post('/decode', (req, res) => {
    const {password, message} = req.body;
    try {
        const decoded = vigenereCipher(message, password, false);
        res.json({decoded});
    } catch (e) {
        console.error('Error while decoding:', e);
        res.status(500).send('error while decoding the message');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

