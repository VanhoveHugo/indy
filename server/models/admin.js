let db = require('../controllers/connection');

class Admin {
    constructor(d) {
        if (d == null) {
            this._id = null
            this._created = null
            this._modified = null
            this._pincode = null
        } else {
            this._id = d.id
            this._created = d.created
            this._modified = d.modified
            this._pincode = d.pincode
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
    get pincode() {
        return this._pincode
    }

    static create(pincode, callback) {
        db.query('INSERT INTO admin (pincode) VALUES(?)', [pincode], (err, res) => {
            if (err) throw err
            callback(res)
        })
    }

    static find(pincode, callback) {
        db.query("SELECT * FROM admin WHERE pincode = ?", [pincode], (err, result) => {
            if (err) throw err
            callback(new Admin(result[0]))
        })
    }
}

module.exports = Admin