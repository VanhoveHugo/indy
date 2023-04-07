const Services = require('../models/services')

describe('Services model', () => {
    describe('Services.all()', () => {
        it('should return an array of services', () => {
            Services.all((services) => {
                expect(services).toBeInstanceOf(Array)
            })
        })
    })

    describe('Services.find()', () => {
        it('should return a service object', () => {
            Services.find(1, (service) => {
                expect(service).toBeInstanceOf(Object)
            })
        })
    })
});
