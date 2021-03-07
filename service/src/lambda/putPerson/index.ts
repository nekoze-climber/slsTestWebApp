import { Handler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import PersonTable from '../../aws/personTable';
import Validator from '../../util/validator';

AWS.config.update({ region: process.env.region });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export const handler: Handler = async (event, context, callback) => {
    const personTable = new PersonTable(docClient);
    const validator = new Validator();
    try {
        if (!validator.checkPersonBody(JSON.parse(event.body))) {
            const errorModel = {
                errorCode: 'STA00002',
                errorMessage: 'Invalid Body',
            };
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify({
                    errorModel,
                }),
            });
        }
        const res = await personTable.putPerson(
            event.pathParameters.personId,
            JSON.parse(event.body)
        );
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(res),
        });
    } catch (err) {
        console.log('putPersonTable-index error');
        return callback(err);
    }
};
