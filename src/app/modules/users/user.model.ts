import { Schema, model } from "mongoose";
import { TAddress, TFullName, TUser } from "./user.interface";


const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

const fullNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

// const ordersSchema = new Schema<TOrders>({
//     productName: { type: String, required: true },
//     price: { type: Number, required: true },
//     quantity: { type: Number, required: true },
// });

const userSchema = new Schema<TUser>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: fullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: { type: addressSchema, required: true },
    // orders: { type: ordersSchema, required: true },
});



export const User = model<TUser>('User', userSchema);
