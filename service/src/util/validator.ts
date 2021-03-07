import { DynamoDB } from 'aws-sdk';
import { PostPerson } from '../types/person';

class Validator {
    checkDyanmoQueryResultEmpty = (dynamoRes: DynamoDB.DocumentClient.QueryOutput) => {
        console.log(dynamoRes.Items);
        if (dynamoRes.Items.length === 0) {
            return true;
        }
        return false;
    };

    checkPersonBody = (person: PostPerson) => {
        if (
            Object.keys(person).indexOf('name') !== -1 &&
            Object.keys(person).indexOf('weight') !== -1 &&
            Object.keys(person).indexOf('height') !== -1 &&
            Object.keys(person).indexOf('age') !== -1
        ) {
            console.log('checkPersonBody True');
            return true;
        }
        console.log('checkPersonBody Flase');
        return false;
    };
}

export default Validator;
