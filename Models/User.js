const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    favorites: {
        type: [Schema.Types.ObjectId],
        ref: 'Recipe'
    }
});

// before any user is saved to db
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        // call next function because we are not signing up user
        return next();
    }
    // function to hash user password
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        // 
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    })
})

module.exports = mongoose.model('User', UserSchema)

