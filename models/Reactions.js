const { Schema,Types } = require('mongoose');
const date = require('date-and-time');
const now = new Date();
const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default:() =>  new Types.ObjectId
        },
        reactionBody:{
            type: String,
            required:"Write some text",
            maxlength:280,
        },
        username:{
            type: String,
            required: 'Username is required'
        },
        createdAt:{
            type: Date,
            default: Date,
            get: day=>date.format(day, 'ddd, MMM DD YYYY')
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)
module.exports = reactionSchema;
