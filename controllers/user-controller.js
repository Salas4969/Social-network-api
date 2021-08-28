const { User } = require("../models");

const userController = {
  async getAllUsers(req, res) {
    const userData = await User.find({});
    res.json(userData);
  },

  async getUserById({ params }, res) {
    const userData = await User.findOne({ _id: params.id })
      .populate("thoughts")
      .populate("friends");
    res.json(userData);
  },

  async createUser({ body }, res) {
    const userData = await User.create(body);
    res.json(userData);
  },

  async updateUser({ params, body }, res) {
    const userData = await User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    });
    res.json(userData);
  },

  async deleteUser({ params }, res) {
    const userData = await User.findOneAndDelete({ _id: params.id });
    res.json(userData);
  },

  async addFriend({ params }, res) {
    const userData = await User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    );
    res.json(userData);
  },

  async deleteFriend({ params }, res) {
    const userData = await User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    );
    res.json(userData);
  },
};

module.exports = userController;
