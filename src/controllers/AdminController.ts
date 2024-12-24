import { Request, Response, NextFunction } from 'express'
import { CreateVandorInput } from '../dto';
import { Vendor } from '../models';



export const CreateVendor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const { name, address, pincode, foodType, email, password, ownerName, phone }  = <CreateVandorInput>req.body;


        const createdVandor =  await Vendor.create({
            name: name,
            address: address,
            pincode: pincode,
            foodType: foodType,
            email: email,
            password: password,
            salt: password,
            ownerName: ownerName,
            phone: phone,
            rating: 0,
            serviceAvailable: false,
            coverImages: [],
            lat: 0,
            lng: 0
        })
    
        return res.json(createdVandor)

  
    } catch (error) {
      next(error);
    }
  };


export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
    
}


export const GetVendorsById = async (req: Request, res: Response, next: NextFunction) => {
    
}