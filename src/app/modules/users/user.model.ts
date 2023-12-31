import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrders, TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";

const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: {
        type: String,
        required: [true, "country is required"]
    },
});

const fullNameSchema = new Schema<TFullName>({
    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
    },
});

const ordersSchema = new Schema<TOrders>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
    userId: { type: Number, required: true, unique: true },
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    password: { type: String, required: true },
    fullName: { type: fullNameSchema, required: true },
    age: { type: Number, required: true },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: { type: addressSchema, required: true },
    orders: { type: ordersSchema },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

// middleware 
userSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        // TODO: make it hide 
        Number(config.bcrypt_salt_number)
    );
    next();
})

userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});


userSchema.statics.isUserExists = async function (id: number) {
    const existingUser = await User.findOne({ userId: id });
    return existingUser;
};


export const User = model<TUser, UserModel>('User', userSchema);
