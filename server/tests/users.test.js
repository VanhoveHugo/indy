const User = require('../models/users');

describe('User model', () => {
    describe('User.all()', () => {
        it('should return an array of users', () => {
            User.all((users) => {
                expect(users).toBeInstanceOf(Array);
            })
        })
    })

    describe('User.find()', () => {
        it('should return a user object', () => {
            User.find(1, (user) => {
                expect(user).toBeInstanceOf(Object);
            })
        })
    })
});
