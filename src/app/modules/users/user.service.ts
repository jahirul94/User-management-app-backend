import { TOrders, TUser } from "./user.interface";
import { User } from "./user.model";


// user create function 
const createUserIntoDB = async (user: TUser) => {
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



// service function for update users data
const updateUserData = async (data: TUser, userId: number) => {
    const result = await User.findOneAndUpdate(
        { userId: userId },
        {
            $set: {
                userId: data.userId,
                username: data.username,
                password: data.password,
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
        },
        { new: true, runValidators: true }

    ).select('-password');

    return result;
};


// service function for delete user 
const deleteUserFromDB = async (userId: number) => {
    const result = await User.deleteOne({ userId: userId });
    return result;
};

// service function for delete user 
const addProductsToDB = async (userId: number, order: TOrders) => {
    const result = await User.findOneAndUpdate(
        { userId: userId },
        {
            $addToSet: {
                orders: order
            }
        },
        { upsert: true, new: true }
    )
    return result;
};



const getSpecificUsersOrdersFromDB = async (userId: number) => {
    const [result] = await User.aggregate([
        { $match: { userId } },
        { $project: { orders: 1, _id: 0 } }
    ])
    return result;
};







export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSpecificUserFromDB,
    updateUserData,
    deleteUserFromDB,
    addProductsToDB,
    getSpecificUsersOrdersFromDB
}