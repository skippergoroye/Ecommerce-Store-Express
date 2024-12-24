import { Request, Response, NextFunction } from "express";
import { VendorLoginInput } from "../dto";
import { Vendor } from "../models";
import { GenerateSignature, ValidatePassword } from "../utility/PasswordUtility";

export const VendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = <VendorLoginInput>req.body;

    const existingVendor = await Vendor.findOne({ email: email });

    if (existingVendor !== null) {
      //validation and give accesss
      const validation = await ValidatePassword(
        password,
        existingVendor.password,
        existingVendor.salt
      );

      if (validation) {
        const signature = GenerateSignature({
            _id: existingVendor.id,
            email: existingVendor.email,
            name:  existingVendor.name
        })

        return res.json(signature)
      } else {
        return res.json({ message: "Password is not valid" });
      }
    }

    return res.json({ message: "Login credential is not valid" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

  } catch (error) {
    console.log(error);
    next(error);
  }
};






export const UpdateVendorProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  };






  export const UpdateVendorService = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
