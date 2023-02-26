const pullPoses = require("../posesDb/db.json")

module.exports = {
    getPoses: (req, res) => {
        res.status(200).send(pullPoses)
    }
}