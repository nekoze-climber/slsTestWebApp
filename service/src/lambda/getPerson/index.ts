import * as AWS from 'aws-sdk';
import { Handler } from 'aws-lambda';
import PersonTable from '../../aws/personTable';
import Validator from '../../util/validator';
import Formatter from '../../util/formatter';

AWS.config.update({ region: process.env.region });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export const handler: Handler = async (event, _context, callback) => {
    const personTable = new PersonTable(docClient);
    const validator = new Validator();
    const formatter = new Formatter();
    try {
        const res = await personTable.getPerson(event.pathParameters.personId);
        if (validator.checkDyanmoQueryResultEmpty(res)) {
            const errorModel = {
                errorCode: 'STA00001',
                errorMessage: 'Not Found',
            };
            return callback(null, {
                statusCode: 404,
                body: JSON.stringify({
                    errorModel,
                }),
            });
        }
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(formatter.getPersonFormatter(res)),
        });
    } catch (err) {
        console.log('getPersonTable-index error');
        return callback(err);
    }
};
