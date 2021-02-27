const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { route } = require('../routes/hotel');

const { roles } = require("../roles");

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
     try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "Du har ikke tilstrækkelig rettigheder"
       });
      }
      next()
     } catch (error) {
      next(error)
     }
    }
   }
    
   exports.allowIfLoggedin = async (req, res, next) => {
    try {
     const user = res.locals.loggedInUser;
     if (!user)
      return res.status(401).json({
       error: "Du er nødt til at være logget ind for at kunne følge denne rute"
      });
      req.user = user;
      next();
     } catch (error) {
      next(error);
     }
   }

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
    try {
        const { email, password, role} = req.body // HUSK at body skal indeholde de tre keys
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword, role: role || "basic"});
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            accessToken
        })
    } catch(error) {
        next(error);
    }
}

exports.login = async(req, res, next) => {
    try {
        const {email, password } = req.body; //HUSK tilføj til re.body
        const user = await User.findOne({ email });
        if (!user) return next(new Error('Email eksisterer ikke'));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Password er ikke korrekt'))
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken
        })
    } catch(error) {
        next(error);
    }
}

// Middleware handling user requests

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) return next(new Error('Bruger findes ikke'));
        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.param.userId;
        await User.findByIdAndUpdate(userId, update);
        const user = await User.findById(userId)
        res.status(200).json({
            data: user, 
            message: 'Brugeren er blevet opdateret'
        });
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'Brugeren er blevet slettet'
        });
    }catch (error) {
        next(error)
    }
}