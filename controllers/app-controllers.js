exports.getApi = (req, res, next) => {
    const appJson = require('../endpoints.json')
    
    
        res.status(200).send(appJson)
    }