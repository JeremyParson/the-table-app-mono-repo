import {Schema} from "mongoose"

const UserSchema = new Schema({
    username: String,
    email: String,
    passwordDigest: {type: String},
    level: Number,
    experience: Number,
    badges: {},
    dateCreated: {type: Date, default: Date.now},
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }
})

export default UserSchema;