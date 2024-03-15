var { Client } = require('@elastic/elasticsearch');
let { v4 } = require('uuid');
let moment = require('moment-timezone');

let uuidv4 = v4

const client = new Client({
    node: process.env.ELK_HOST,
    auth: {
        username: process.env.ELK_USERNAME,
        password: process.env.ELK_PASSWORD
    }
});

let index = process.env.ELK_INDEX || '';
let indexDebug = process.env.ELK_DEBUG || process.env.ELK_INDEX;

module.exports = class Logger {
    static async debug(data) {
        try {
            data['@timestamp'] = (new Date()).toISOString()
            data.type = 'debug'
            if (process.env.ELK_DEBUG_LOG === 'true') {
                console.log(data);
            }
            let response = await client.create({
                index: indexDebug + '-' + moment().format('YYYY-MM-DD'),
                body: data,
                id: uuidv4()
            })
        } catch (error) {
            console.log(data, error);
        }
    }

    static async error(data) {
        try {
            data['@timestamp'] = (new Date()).toISOString()
            data['type'] = 'error'
            // data.data = JSON.stringify(data.data) || "none"; 
            if (process.env.ELK_DEBUG_LOG === 'true') {
                console.log(data);
            }
            let response = await client.create({
                index: indexDebug + '-' + moment().format('YYYY-MM-DD'),
                body: data,
                id: uuidv4()
            })
        } catch (error) {
            console.log(data, error);
        }
    }


}