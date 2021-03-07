import Validator from '../src/util/validator';

const queryResultSuccess = {
    Items: [{ name: 'taro' }],
};

const queryResultEmpty = {
    Items: [],
};

const postPersonBodySuccess = {
    name: 'taro',
    age: '22',
    weight: '70',
    height: '180',
};

describe('Test of validator.checkDyanmoQueryResultEmpty', () => {
    it('not empty case', () => {
        const validator = new Validator();
        const result = validator.checkDyanmoQueryResultEmpty(queryResultSuccess);
        expect(result).toEqual(false);
    });

    it('empty case', () => {
        const validator = new Validator();
        const result = validator.checkDyanmoQueryResultEmpty(queryResultEmpty);
        expect(result).toEqual(true);
    });
});

describe('Test of validator.checkPersonBody', () => {
    it('success case', () => {
        const validator = new Validator();
        const result = validator.checkPersonBody(postPersonBodySuccess);
        expect(result).toEqual(true);
    });
});
