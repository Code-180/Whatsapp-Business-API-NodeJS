//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Package
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get('/', (req, res) => {
    let resData = {
        status: false,
        answare: ''
    }
    resData.status = true;
    resData.message = 'Hello Every One Form From Code 180. This API is working......';
    return res.status(200).json(resData);
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get('/sendMessage', (req, res) => {
    let resData = {
        status: false,
        answare: ''
    }
    try {
        const options = {
            method: 'POST',
            url: 'https://graph.facebook.com/v17.0/108110622388455/messages',
            headers: {
                Authorization: process.env.SECRET_KEY,
                'Content-Type': 'application/json'
            },
            body: {
                messaging_product: 'whatsapp',
                to: process.env.TO,
                type: 'template',
                template: {
                    name: 'hello_world',
                    language: {
                        code: 'en_US'
                    }
                }
            },
            json: true
        };
        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            //+++++++++++++++++++++++++++++++++++++++++++++
            resData.status = true;
            resData.respondData = body;
            return res.status(200).json(resData);
        });
    } catch (e) {
        resData.status = false;
        resData.answare = e;
        return res.status(200).json(resData);
    }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(3000, () => {
    console.log("starting...");
});