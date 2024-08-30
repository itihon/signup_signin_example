import express from 'express';
import bodyParser from 'body-parser';
import signinValidation from './public/validation/signin-validation.js';
import signupValidation from './public/validation/signup-validation.js';
import { emailValidation } from './public/validation/signup-validation.js';

const app = express();
const urlencodeParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));

function requestHandler(req, res) {
    const { validationResult } = req;

    if (validationResult.isValid) {
        res.send('VALID');
    }
    else {
        res.json(validationResult);
    }
}

function checkemailHandler(req, res) {
    res.json(req.validationResult.isValid);
}

// validations are added as middlewares
app.post('/signup', urlencodeParser, signupValidation, requestHandler);
app.post('/signin', urlencodeParser, signinValidation, requestHandler);
app.post('/checkemail', urlencodeParser, emailValidation, checkemailHandler);

app.listen(8080, () => {
    console.log('Listening port 8080 ...');
});
