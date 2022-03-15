module.exports = {
    coveragePathIgnorePatterns: [
        '/node_modules/',
    ],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
}