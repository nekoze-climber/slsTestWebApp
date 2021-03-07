import { DynamoDB } from 'aws-sdk';

import { v4 as uuidv4 } from 'uuid';
import { PersonResponse, PostPerson } from '../types/person';

export default class PersonTable {
    client: DynamoDB.DocumentClient;

    constructor(serviceClient: DynamoDB.DocumentClient) {
        this.client = serviceClient;
    }

    getPerson(personId: string): Promise<DynamoDB.DocumentClient.QueryOutput> {
        const params = {
            TableName: process.env.PERSON_TABLE_NAME,
            KeyConditionExpression: '#hash = :personId',
            ExpressionAttributeNames: {
                '#hash': 'personId',
            },
            ExpressionAttributeValues: {
                ':personId': personId,
            },
        };
        return new Promise((resolve, reject) => {
            this.client.query(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log('getPerson Success!');
                    resolve(data);
                }
            });
        });
    }

    postPerson(body: PostPerson): Promise<PersonResponse> {
        const person = {
            ...body,
            personId: uuidv4(),
        };
        const params = {
            TableName: process.env.PERSON_TABLE_NAME,
            Item: person,
        };
        console.log(params);
        return new Promise((resolve, reject) => {
            this.client.put(params, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log('postPerson Success!');
                    resolve(person);
                }
            });
        });
    }

    putPerson(personId: string, body: PostPerson) {
        const person = {
            ...body,
            personId,
        };
        const params = {
            TableName: process.env.PERSON_TABLE_NAME,
            Key: {
                personId: person.personId,
                age: person.age,
            },
            UpdateExpression: 'set #name = :name, #weight = :weight, #height = :height',
            ExpressionAttributeNames: {
                '#name': 'name',
                '#weight': 'weight',
                '#height': 'height',
            },
            ExpressionAttributeValues: {
                ':name': person.name,
                ':weight': person.weight,
                ':height': person.height,
            },
        };
        console.log(params);
        return new Promise((resolve, reject) => {
            this.client.update(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log('putPerson Success!');
                    resolve(data);
                }
            });
        });
    }

    deletePerson(person: PersonResponse) {
        const params = {
            TableName: process.env.PERSON_TABLE_NAME,
            Key: {
                personId: person.personId,
                age: person.age,
            },
        };
        console.log(params);
        return new Promise((resolve, reject) => {
            this.client.delete(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log('deletePerson Success!');
                    resolve(data);
                }
            });
        });
    }
}
