const Tips = require('../models/tips')

describe('Tips model', () => {
    describe('Tips.all()', () => {
        it('should return an array of tips', () => {
            Tips.all((tips) => {
                expect(tips).toBeInstanceOf(Array)
            })
        })
    })

    describe('Tips.find()', () => {
        it('should return a tip object', () => {
            Tips.find(1, (tip) => {
                expect(tip).toBeInstanceOf(Object)
            })
        })
    })
});
