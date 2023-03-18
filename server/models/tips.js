let db = require('../controllers/connection');

class Tips {
    constructor(d) {
        if (d == null) {
            this._id = null
            this._created = null
            this._modified = null
            this._userid = null
            this._name = null
        } else {
            this._id = d.id
            this._created = d.created
            this._modified = d.modified
            this._userid = d.uid
            this._name = d.name
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
    get userid() {
        return this._userid
    }
    get name() {
        return this._lastname
    }
    static create(userid, name, callback) {
        db.query('INSERT INTO tips (uid, name) VALUES (?, ?)', [userid, name], (err, result) => {
            if (err) throw err
            callback(new Tips(result))
        })
    }
    static all(callback) {
        db.query("SELECT * FROM tips ORDER BY name DESC", (err, result) => {
            if (err) throw err
            callback(result.map((d) => new Tips(d)))
        })
    }
    static update(id, name, callback) {
        db.query('UPDATE tips SET name = ? WHERE id = ?', [name, id], (err, result) => {
            if (err) throw err
            callback(new Tips(result))
        })
    }
    static delete(id, callback) {
        db.query('DELETE FROM tips WHERE id = ?', [id], (err, result) => {
            if (err) throw err
            callback(new Tips(result))
        })
    }
}

module.exports = Tips