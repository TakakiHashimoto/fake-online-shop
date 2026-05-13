import { IUser, User } from "../models/user.model";

async function getAllUsers() {
  return await User.find();
}

async function getUserByEmail(email: string) {
  return await User.findOne({ email: email.toLowerCase().trim() });
}

async function getUserById(id: string) {
  return await User.findById(id);
}

async function createUser(data: Partial<IUser>) {
  return await User.create(data);
}

async function updateUser(id: string, data: Partial<IUser>) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}

async function deleteUser(id: string) {
  return await User.findByIdAndDelete(id);
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
