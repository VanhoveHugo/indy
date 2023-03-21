let db = require('../controllers/connection');

class Services {
    constructor(d) {
        if (d == null) {
            this._id = null
            this._created = null
            this._modified = null
            this._shiftType = null
            this._shiftClose = null
        } else {
            this._id = d.id
            this._created = d.created
            this._modified = d.modified
            this._shiftType = d.shiftType
            this._shiftClose = d.shiftClose
        }
    }
    get id() {
        return this._id
    }
    get created() {
        return this._created
    }
    get modified() {
        return this._modified
    }
    get shiftType() {
        return this._shiftType
    }
    get shiftClose() {
        return this._shiftClose
    }
    static create(shiftType, shiftClose, callback) {
        db.query('INSERT INTO services (shiftType, shiftClose) VALUES (?, ?)', [shiftType, shiftClose], (err, result) => {
            if (err) throw err
            callback(new Services(result))
        })
    }
    static all(callback) {
        db.query("SELECT * FROM services ORDER BY shiftType DESC", (err, result) => {
            if (err) throw err
            callback(result.map((d) => new Services(d)))
        })
    }
    static update(id, shiftType, shiftClose, callback) {
        db.query('UPDATE services SET shiftType = ?, shiftClose = ? WHERE id = ?', [shiftType, shiftClose, id], (err, result) => {
            if (err) throw err
            callback(new Services(result))
        })
    }
    static delete(id, callback) {
        db.query('DELETE FROM services WHERE id = ?', [id], (err, result) => {
            if (err) throw err
            callback(new Services(result))
        })
    }
    static find(id, callback) {
        db.query("SELECT * FROM services WHERE id = ?", [id], (err, result) => {
            if (err) throw err
            callback(new Services(result[0]))
        })
    }
}

module.exports = Services