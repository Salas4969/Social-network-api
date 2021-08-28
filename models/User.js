const { Schema,Types, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: 'First Name is Required',
      unique: true
    },

    friends:[ {
        type: Schema.Types.ObjectId,
        ref:'User'
    }],

    password: {
      type: String,
      trim: true,
      required: 'Password is Required',
      validate: [({ length }) => length >= 6, 'Password should be longer.']
    },

    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
      required:true,
    },

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref:'Thoughts'
    }]
  },
  {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
