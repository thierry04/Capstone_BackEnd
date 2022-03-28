import User from "../models/user";

class userService {
  static async registerUser(credentials) {
    const userCredentials = await User.create(credentials);
    return userCredentials;
  }

  static async findProfiles() {
    const foundProfiles = await User.find();
    return foundProfiles;
  }

  static async findUser({ id: _id }) {
    const findUser = await User.findOne({ _id });
    return findUser;
  }

  static async updatedProfile({ id: _id }, user) {
    const updateProfile = await User.findOneAndUpdate({ _id }, user, {
      runValidators: true,
      new: true,
    });
    return updateProfile;
  }

  static async deleteProfile({ id: _id }) {
    const removeProfile = await User.deleteOne({ _id });
    return removeProfile;
  }

  static async findEmail({ email }) {
    const emailFind = await User.findOne({ email });
    return emailFind;
  }

  static async deleteUsers() {
    const removeAllUsers = await User.deleteMany({});
    return removeAllUsers;
  }
}

export default userService;
