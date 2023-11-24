import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (user: TUser) => {
    const result = await User.create(user);
    return result;
};

const getAllUserFromDB = async () => {
    const result = await User.aggregate([
        { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } }
    ]);
    return result;
};



export const UserServices = {
    createStudentIntoDB,
    getAllUserFromDB
}