import { Request, Response, NextFunction } from "express";
import { CustomRequest, EditVendorInput, VendorLoginInput } from "../dto";
import { Vendor } from "../models";
import {
  GenerateSignature,
  ValidatePassword,
} from "../utility/PasswordUtility";

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
        const signature = await GenerateSignature({
          _id: existingVendor.id,
          email: existingVendor.email,
          name: existingVendor.name,
        });

        return res.json(signature);
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
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (user) {
      const existingVendor = await Vendor.findById(user._id);
      return res.json(existingVendor);
    }

    return res.json({ message: "vendor Information Not Found" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};





export const UpdateVendorProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { foodType, name, address, phone } = <EditVendorInput>req.body;

    const user = req.user;
    if (user) {
      const existingVendor = await Vendor.findById(user._id);

      if (existingVendor) {
        existingVendor.name = name;
        existingVendor.address = address;
        existingVendor.phone = phone;
        existingVendor.foodType = foodType;
        const saveResult = await existingVendor.save();

        return res.json(saveResult);
      }

      return res.status(404).json({ message: 'Vendor not found' });
    }

    return res.status(401).json({ message: 'User not authenticated' });
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
