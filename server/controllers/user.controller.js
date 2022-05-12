const User = require("../models/user.model");

const register = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);
            res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
    }

const login = async(req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if(user === null) {
            return res.sendStatus(400);
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if(!correctPassword) {
            return res.sendStatus(400);
        }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        res
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }

const getOne = (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}

module.exports = {
    register,
    login,
    getOne
};