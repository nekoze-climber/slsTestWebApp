module.exports = {
    roots: ['<rootDir>'],
    collectCoverageFrom: ['./**/src/**/*.{ts}', '!<rootDir>/**/node_modules/'],
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules'],
    testMatch: ['./**/__test__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
};
