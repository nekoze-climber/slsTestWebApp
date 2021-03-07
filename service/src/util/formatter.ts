import { DynamoDB } from 'aws-sdk';
import { PersonResponse } from '../types/person';

class Formatter {
    getPersonFormatter = (queryResult: DynamoDB.DocumentClient.QueryOutput): PersonResponse =>
        queryResult.Items[0] as PersonResponse;
}

export default Formatter;
