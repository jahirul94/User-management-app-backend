import { TUser } from "./user.interface";
import { User } from "./user.model";


// user create function 
const createStudentIntoDB = async (user: TUser) => {
    const result = await User.create(user);
    return result;
};

// get all users function 
const getAllUserFromDB = async () => {
    const result = await User.aggregate([
        { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } }
    ]);
    return result;
};

// get specific user function 
const getSpecificUserFromDB = async (userId: number) => {
    const result = await User.aggregate([
        { $match: { userId } },
        { $project: { userId: 1, username: 1, fullName: 1, age: 1, email: 1, address: 1, isActive: 1 } }
    ]);
    return result;
};



// function for update users data
const updateUserData = async (data: TUser, userId: number) => {
    const result = await User.updateOne(
        { $match: { userId } },
        {
            $set: {
                userId: data.userId,
                username: data.username,
                "fullName.firstName": data.fullName.firstName,
                "fullName.lastName": data.fullName.lastName,
                age: data.age,
                email: data.email,
                isActive: data.isActive,
                hobbies: [
                    ...data.hobbies
                ],
                "address.street": data.address.street,
                "address.city": data.address.city,
                "address.country": data.address.country,
            }
        }
    );

    return result;
};



const deleteUserFromDB = async (userId: number) => {
    const result = await User.updateOne({ userId }, { isDeleted: true });
    return result;
};


export const UserServices = {
    createStudentIntoDB,
    getAllUserFromDB,
    getSpecificUserFromDB,
    updateUserData,
    deleteUserFromDB
}