let db = require('../controllers/connection');

class User {
    constructor(d) {
        if (d == null) {
            this._id = null
            this._created = null
            this._modified = null
            this._firstname = null
            this._lastname = null
            this._status = null
            this._active = null
        } else {
            this._id = d.id
            this._created = d.created
            this._modified = d.modified
            this._firstname = d.firstname
            this._lastname = d.lastname
            this._status = d.status
            this._active = d.active
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
    get firstname() {
        return this._firstname
    }
    get lastname() {
        return this._lastname
    }
    get status() {
        return this._status
    }
    get active() {
        return this._active
    }

    static find(id, callback) {
        db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
            if (err) throw err
            callback(new User(result[0]))
        })
    }
    static all(callback) {
        db.query("SELECT * FROM users ORDER BY firstname DESC", (err, result) => {
            if (err) throw err
            callback(result.map((d) => new User(d)))
        })
    }
    static create(firstname, lastname, status, active, callback) {
        db.query('INSERT INTO users (firstname, lastname, status, active) VALUES(?,?,?,?)', [firstname, lastname, status, active], (err, res) => {
            if (err) throw err
            callback(res)
        })
    }
    static update(id, firstname, lastname, status, active, callback) {
        db.query('UPDATE users SET firstname = ?, lastname = ?, status = ?, active = ? WHERE id = ?', [firstname, lastname, status, active, id], (err, res) => {
            if (err) throw err
            callback(res)
        })
    }
    static delete(id, callback) {
        db.query('UPDATE users SET firstname = ?, lastname = ?, status = ?, active = ? WHERE id = ?', ["NaN", "NaN", 0, 0, id], (err, res) => {
            if (err) throw err
            callback(res)
        })
    }
}

module.exports = User