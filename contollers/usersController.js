const bcryptjs = require('bcryptjs');
const userService = require('../services/userServices');

exports.register = (req, res) => {
    const { username, passowrd } = req.body;
    const salt = bcryptjs.genSalt(10);

    req.body.passowrd = bcryptjs.hashSync(passowrd, salt);
    userService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success',
            data: result,
        });
    });
};
exports.login= (req, res, next) => {
    const { username, password } = req.body;


    userService.login(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success',
            data: result,
        });
    });
exports.userProfile  =(req, res)=>{
    return res.status(200).json({message: "Authorized User!"})
}

}
