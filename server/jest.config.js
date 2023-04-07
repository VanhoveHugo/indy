module.exports = {
    // specify the path to your Jest test files
    testMatch: ['**/tests/**/*.js'],
    // specify the environment to use for the tests
    testEnvironment: 'node',
    // specify any environment variables needed for the tests
    // this can include database connection details, like the password
    // make sure to use the appropriate environment variables for your database driver
    // for example, for MySQL, you might use MYSQL_USER and MYSQL_PASSWORD
    // whereas for MongoDB, you might use MONGO_URL
    // this example assumes you're using MySQL
    setupFiles: ['./jest.setup.js'],
    // other Jest configuration options...
  }
  