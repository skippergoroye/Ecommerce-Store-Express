import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility/PasswordUtility";




/* ============================= Find Vendor ======================= */
export const FindVendor = async (id: String | undefined, email?: string) => {

  if(email){
      return await Vendor.findOne({ email: email})
  }else{
      return await Vendor.findById(id);
  }

}




/* ============================= Create Vendor ======================= */
export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      address,
      pincode,
      foodType,
      email,
      password,
      ownerName,
      phone,
    } = <CreateVandorInput>req.body;

    const CheckExistingVendor = await Vendor.findOne({ email: email });

    if (CheckExistingVendor !== null) {
      return res.json({ message: "A Vendor already exists with this email" });
    }

    //generate password and salt
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const createdVandor = await Vendor.create({
      name: name,
      address: address,
      pincode: pincode,
      foodType: foodType,
      email: email,
      password: userPassword,
      salt: salt,
      ownerName: ownerName,
      phone: phone,
      rating: 0,
      serviceAvailable: false,
      coverImages: [],
      foods: []
      // lat: 0,
      // lng: 0
    });

    return res.json(createdVandor);
  } catch (error) {
    console.log(error);
    next(error);
  }
};



/* ============================= Get Vendor ======================= */
export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendors = await Vendor.find();

    if (vendors !== null) {
      return res.json(vendors);
    }

    return res.json({ message: "vendor data not available" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};







/* ============================= Get Vendor By Id ======================= */
export const GetVendorsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendorId = req.params.id;

    const vendor = await Vendor.findById(vendorId);

    if (vendor !== null) {
      return res.json(vendor);
    }

    return res.json({ message: "vendor data not available" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
