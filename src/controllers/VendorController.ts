import { Request, Response, NextFunction } from "express";
import {
  CreateFoodInput,
  CustomRequest,
  EditVendorInput,
  VendorLoginInput,
} from "../dto";
import { Food, Vendor } from "../models";
import {
  GenerateSignature,
  ValidatePassword,
} from "../utility/PasswordUtility";

/* =============================  Vendor Login ======================= */
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

/* =============================  GetVendorProfile ======================= */
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

/* =============================  UpdateVendorProfile ======================= */
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
      return res.status(404).json({ message: "Vendor not found" });
    }
    return res.status(401).json({ message: "User not authenticated" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};









/* =============================  UpdateVendorProfile ======================= */
export const UpdateVendorCoverImage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (user) {
      const vendor = await Vendor.findById(user._id);

      if (vendor !== null) {
        
        const vendorCoverImage = req.file ? req.file.path : undefined;

        if (vendorCoverImage) {
          vendor.coverImages.push(vendorCoverImage);
        }
        const result = await vendor.save();
        return res.json(result);
      }
    }
    return res.json({ message: "Something went wrong with add food" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/* =============================  UpdateVendorService ======================= */
export const UpdateVendorService = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (user) {
      const existingVendor = await Vendor.findById(user._id);

      if (existingVendor !== null) {
        existingVendor.serviceAvailable != existingVendor.serviceAvailable;
        const savedResult = await existingVendor.save();
        return res.json(savedResult);
      }
      return res.json(existingVendor);
    }
    return res.json({ message: "Vendor information not found" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/* =============================  AddVendorFood ======================= */
export const AddFood = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const { name, description, category, foodType, readyTime, price } = <
      CreateFoodInput
    >req.body;

    if (user) {
      const vendor = await Vendor.findById(user._id);

      if (vendor !== null) {
        const createdFood = await Food.create({
          vendorId: vendor._id,
          name: name,
          description: description,
          category: category,
          price: price,
          rating: 0,
          readyTime: readyTime,
          foodType: foodType,
          foodImages: req.file ? req.file.path : undefined,
        });

        vendor.foods.push(createdFood);
        const result = await vendor.save();
        return res.json(result);
      }
    }
    return res.json({ message: "Something went wrong with add food" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/* =============================  GetVendorFood ======================= */
export const GetFoods = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (user) {
      const foods = await Food.find({ vendorId: user._id });
      if (foods !== null) {
        return res.json(foods);
      }
    }
    return res.json({ message: "Food information Not found" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
