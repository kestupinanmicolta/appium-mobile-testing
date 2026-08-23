module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        format: ['@serenity-js/cucumber'],
        formatOptions: {
            specDirectory: './src/features'
        },
        require: [
            './test/support/**/*.ts',
            './test/steps/**/*.ts',
        ],
        formatOptions: {
            snippetInterface: 'async-await'
        },
    },
};
