const User = require('../../model/user/user.model')

const createUser = async (req, res) => {
    try {
        let params = req.body
        console.log('params----',params);
        let user = await User.create(params)
        return res.status(200).json(user);
    } catch (error) {
        return res.json({ error: 'error while create user' })
    }
}

const getUsers = async (req, res) => {
    try {
        let user = await User.find()
        return res.status(200).json(user);
    } catch (error) {
        return res.json({ error: 'error while get users' })
    }
}


module.exports = {
    createUser,
    getUsers
}