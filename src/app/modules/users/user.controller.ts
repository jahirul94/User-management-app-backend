import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validate";

const createStudent = async (req: Request, res: Response) => {
    try {
        const user = req.body.user;
        // zod validation 
        const zodParsedData = userValidationSchema.parse(user);
        // save into db 
        const result = await UserServices.createStudentIntoDB(zodParsedData);
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