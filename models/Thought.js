const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reactions")
const date = require('date-and-time');
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required:"Write some text",
            minlength:1,
            maxlength:280,
        },
        createdAt:{
            type: Date,
            default: Date,
            get: day=>date.format(day, 'ddd, MMM DD YYYY')
        },
        username:{
            type: String,
            required:'Username is required'
        },
        userId:{
            type:Schema.Types.ObjectId,
            required:"Eneter Id from username"
        },
        reactions:[reactionSchema]

},{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thoughts = model('Thoughts', thoughtSchema);
module.exports = Thoughts;