const jwt = require('jsonwebtoken');
const memberSchema = require('../models/member');

const middleware = {
    auth: async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send('Unauthorized: No token provided');
        }

        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY);
            const user = await memberSchema.findById(payload.userId);

            if (!user) {
                return res.status(404).send('User not found');
            }

            req.user = { id: user._id, name: user.name, role: user.roleAdmin };
            next(); 
        } catch (error) {
            res.status(500).send(error.message);
        }

    }
}

module.exports = { ...middleware }