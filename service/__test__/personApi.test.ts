import * as frisby from 'frisby';
import { Joi } from 'frisby';

frisby.globalSetup({
    request: {
        headers: {
            'Content-Type': 'application/json',
        },
    },
});

const API_GW_ENDPOINT = '';

const PostPersonBody = {
    age: '100',
    height: '180',
    name: 'taro',
    weight: '70',
};

const resultTypes = {
    age: Joi.string().required(),
    height: Joi.string().required(),
    name: Joi.string().required(),
    weight: Joi.string().required(),
    personId: Joi.string().required(),
};

describe('Post-Get-Delete Person API test', () => {
    it('success case', () =>
        frisby
            .post(`${API_GW_ENDPOINT}/slsTestWebApp/v1/api/person`, PostPersonBody)
            .expect('status', 201)
            .expect('jsonTypes', resultTypes)
            .expect('json', 'age', PostPersonBody.age)
            .expect('json', 'height', PostPersonBody.height)
            .expect('json', 'name', PostPersonBody.name)
            .expect('json', 'weight', PostPersonBody.weight)
            .then((res) => {
                const { personId } = res.json;
                return frisby
                    .get(`${API_GW_ENDPOINT}/slsTestWebApp/v1/api/person/${personId}`)
                    .expect('status', 200)
                    .expect('jsonTypes', resultTypes)
                    .expect('json', 'age', PostPersonBody.age)
                    .expect('json', 'height', PostPersonBody.height)
                    .expect('json', 'name', PostPersonBody.name)
                    .expect('json', 'weight', PostPersonBody.weight)
                    .expect('json', 'personId', personId);
            }));
});
