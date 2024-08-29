import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const urlencodeParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

app.post('/signup', urlencodeParser, () => {});
app.post('/signin', urlencodeParser, () => {});
app.post('/checkemail', urlencodeParser, () => {});

app.listen(8080, () => {
    console.log('Listening port 8080 ...');
});
