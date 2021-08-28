const { Thoughts } = require("../models");
const { User } = require("../models");

const thoughtController = {
  async getAllThoughts(req, res) {
    const thoughtData = await Thoughts.find({});
    res.json(thoughtData);
  },

  async getThoughtById({ params }, res) {
    const thoughtData = await Thoughts.findOne({ _id: params.id });
    res.json(thoughtData);
  },

  async createThought({ body }, res) {
    const thoughtData = await Thoughts.create(body);
    console.log(thoughtData)
   const data = await User.findOneAndUpdate(
      { _id: body.userId},
      { $addToSet: {thoughts: thoughtData._id}},
      { new: true }
    )
    console.log(data)
    res.json(thoughtData)
  },

  async updateThought({ params, body }, res) {
    const thoughtData = await Thoughts.findOneAndUpdate(
    { _id: params.id },
    body,
    {new: true}
    );
    res.json(thoughtData);
  },

  async deleteThought({ params }, res) {
    const thoughtData = await Thoughts.findOneAndDelete({ _id: params.id });
    res.json(thoughtData);
  },

  async addReaction({ params }, res) {
    const thoughtData = await Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: params.reactionId } },
      { new: true }
    );
    res.json(thoughtData);
  },

  async deleteReaction({ params }, res) {
    const thoughtData = await Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: params.reactionId } },
      { new: true }
    );
    res.json(thoughtData);
  },
};

module.exports = thoughtController;
