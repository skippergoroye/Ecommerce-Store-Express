import express, { Request, Response, NextFunction } from "express";
import {
  AddFood,
  GetFoods,
  GetVendorProfile,
  UpdateVendorCoverImage,
  UpdateVendorProfile,
  UpdateVendorService,
  VendorLogin,
} from "../controllers";
import { Authenticate } from "../middleware";
import { addFoodImage, vendorCoverImageUpload } from "../utility/multer";

const router = express.Router();

router.post("/login", VendorLogin);


router.use(Authenticate)
router.get("/profile",  GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.patch("/service", UpdateVendorService);
router.patch("/coverimage", vendorCoverImageUpload.single("vendorCoverImage"),  UpdateVendorCoverImage);






router.post("/food", addFoodImage.single("foodImages"),  AddFood);
router.get("/foods", GetFoods);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from Vendor" });
});

export { router as VendorRoute };
