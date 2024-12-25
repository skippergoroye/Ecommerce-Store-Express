import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomRequest, VendorPayload } from "../dto";
import { APP_SECRET } from "../config/db";
import { AuthPayload } from "../dto";




export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};




export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};




export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};




export const GenerateSignature = async (payload: VendorPayload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
};




export const ValidateSignature  = async(req: CustomRequest) => {
    const signature = req.headers['authorization'] as string | undefined;

    if(signature){
        try {
            const payload = jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload; 
            req.user = payload;
            return true;
        } catch(err){
            return false
        } 
    }
    return false
};
