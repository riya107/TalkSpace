const admin = require('./firebase-config');

const decodeToken = async(req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
            req.body.name = decodeValue.name;
            req.body.email = decodeValue.email;
            return next();
        }
        return res.status(400).json({success:false, message: 'Unauthorized' });
    } catch (e) {
        return res.status(500).json({success:false, message: 'Internal Error' });
    }
}

module.exports = decodeToken;