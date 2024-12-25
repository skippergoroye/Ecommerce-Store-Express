import { VendorPayload } from './Vendor.dto'
import { Request } from "express";




export type AuthPayload = VendorPayload 



// saver
export interface CustomRequest extends Request {
    user?: AuthPayload;
  }

