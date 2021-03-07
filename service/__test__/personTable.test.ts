import * as AWS from 'aws-sdk';
import PersonTable from '../src/aws/personTable';

AWS.config.update({ region: 'ap-northeast-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const person = {
    name: 'taro',
    weight: '65',
    height: '180',
    age: '30',
};

const personWithId = { ...person, personId: expect.anything() };

describe('Test of personTable.getPerson', () => {
    it('success case', async () => {
        const personTable = new PersonTable(docClient);
        const succ = {
            Items: { result: 'result' },
        };
        docClient.query = jest.fn().mockImplementation((params, cb) => {
            cb(null, succ);
        });
        const result = await personTable.getPerson('personId');
        expect(result).toEqual(succ);
    });

    it('failure case', async () => {
        const personTable = new PersonTable(docClient);
        const error = new Error('error');
        docClient.query = jest.fn().mockImplementation((params, cb) => {
            cb(error);
        });
        const result = await personTable
            .getPerson('personId')
            .then((res) => res)
            .catch((err) => err);
        expect(result).toEqual(error);
    });
});

describe('Test of personTable.postPerson', () => {
    it('success case', async () => {
        const personTable = new PersonTable(docClient);
        const succ = {
            Items: { result: 'result' },
        };
        docClient.put = jest.fn().mockImplementation((params, cb) => {
            cb(null, succ);
        });
        const result = await personTable.postPerson(person);
        expect(result).toEqual(personWithId);
    });

    it('failure case', async () => {
        const personTable = new PersonTable(docClient);
        const error = new Error('error');
        docClient.put = jest.fn().mockImplementation((params, cb) => {
            cb(error);
        });
        const result = await personTable
            .postPerson(person)
            .then((res) => res)
            .catch((err) => err);
        expect(result).toEqual(error);
    });
});

describe('Test of personTable.putPerson', () => {
    it('success case', async () => {
        const personTable = new PersonTable(docClient);
        const succ = {
            Items: { result: 'result' },
        };
        docClient.update = jest.fn().mockImplementation((params, cb) => {
            cb(null, succ);
        });
        const result = await personTable.putPerson('aaa', {
            age: '30',
            name: 'taro',
            weight: '70',
            height: '180',
        });
        expect(result).toEqual(succ);
    });

    it('failure case', async () => {
        const personTable = new PersonTable(docClient);
        const error = new Error('error');
        docClient.update = jest.fn().mockImplementation((params, cb) => {
            cb(error);
        });
        const result = await personTable
            .putPerson('aaa', person)
            .then((res) => res)
            .catch((err) => err);
        expect(result).toEqual(error);
    });
});

describe('Test of personTable.deletePerson', () => {
    it('success case', async () => {
        const personTable = new PersonTable(docClient);
        const succ = {
            Items: { result: 'result' },
        };
        docClient.delete = jest.fn().mockImplementation((params, cb) => {
            cb(null, succ);
        });
        const result = await personTable.deletePerson({
            personId: 'aaa',
            age: '30',
            name: 'taro',
            weight: '70',
            height: '180',
        });
        expect(result).toEqual(succ);
    });

    it('failure case', async () => {
        const personTable = new PersonTable(docClient);
        const error = new Error('error');
        docClient.delete = jest.fn().mockImplementation((params, cb) => {
            cb(error);
        });
        const result = await personTable
            .deletePerson(personWithId)
            .then((res) => res)
            .catch((err) => err);
        expect(result).toEqual(error);
    });
});
