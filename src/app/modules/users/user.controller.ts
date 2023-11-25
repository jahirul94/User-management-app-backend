import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validate";
import { User } from "./user.model";

// controller function for create users
const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        // zod validation 
        const zodParsedData = userValidationSchema.parse(user);
        // save into db 
        const result = await UserServices.createUserIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User is created successfully',
            data: result,
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
};


// controller function for get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
};

// controller function for get single user
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const result = await UserServices.getSpecificUserFromDB(parseInt(userId));
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            },
        });
    }
};


// controller function for update user details
const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const data = req.body;
        if (await User.isUserExists(parseInt(userId))) {
            const result = await UserServices.updateUserData(data, parseInt(userId));
            res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: result,
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            },
        });
    }
};



// controller function for update user details
const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        // validate user isExist 
        if (await User.isUserExists(Number(userId))) {
            const result = await UserServices.deleteUserFromDB(parseInt(userId));
            res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found"
                }
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
};

// order management 
const createProduct = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const order = req.body;
    try {
        if (await User.isUserExists(Number(userId))) {
            // save into db 
            const result = await UserServices.addProductsToDB(Number(userId), order);
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found"
                }
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }

}

const getSpecificUserProduct = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const result = await UserServices.getSpecificUsersOrdersFromDB(parseInt(userId));
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: {
                code: 404,
                description: "Product not found!"
            },
        });
    }
}





export const UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    createProduct,
    getSpecificUserProduct
};