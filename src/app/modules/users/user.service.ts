import { TOrders, TUser } from "./user.interface";
import { User } from "./user.model";


// user create function 
const createUserIntoDB = async (user: TUser) => {

    if (await User.isUserExists(user.userId)) {
        throw new Error('The user(userId) already exists!');
    }
    const createdUser = await User.create(user);
    const result = await User.findOne({ userId: createdUser.userId }).select("-password -isDeleted -__v")
    return result;
};

// get all users function 
const getAllUserFromDB = async () => {
    const result = await User.aggregate([
        { $match: { isDeleted: { $ne: true } } },
        { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } }
    ]);
    return result;
};

// get specific user function 
const getSpecificUserFromDB = async (userId: number) => {
    const result = await User.findOne({ userId }).select("userId username fullName age email address isActive")
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
    const result = await User.updateOne({ userId: userId }, { isDeleted: true });
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

const getUserOrdersTotalPrice = async (userId: number) => {
    // get total price using mongoose aggregation
    const totalPrice = User.aggregate([
        { $match: { userId } },
        { $unwind: '$orders' },
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
                },
            },

        },
        { $project: { _id: 0 } }
    ])

    return totalPrice;
};







export const UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSpecificUserFromDB,
    updateUserData,
    deleteUserFromDB,
    addProductsToDB,
    getSpecificUsersOrdersFromDB,
    getUserOrdersTotalPrice
}