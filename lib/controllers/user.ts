import { User } from "../models/user";

async function handler(decodedToken) {
  const user = new User(decodedToken.userId);
  await user.pull();

  if (!user.data) {
    console.error("❌ Error: user.data es null o undefined");
    throw new Error("User data not found");
  }

  return { userData: user.data, userID: decodedToken.userId };
}

async function updateData(body) {
  const newData = await User.updateUser(body);

  return newData;
}

async function updateAddress(body) {
  const newData = await User.updateAddress(body);

  return newData;
}

export { handler, updateData, updateAddress };
