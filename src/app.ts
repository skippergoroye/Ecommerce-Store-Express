import express, { Express, Request, Response } from "express";
import logger from 'morgan'
import {AdminRoute,  VendorRoute} from './routes'
import dotenv from "dotenv";
import connectDB from "./config/db";
dotenv.config();




const app: Express = express();
const port = process.env.PORT || 3000;
connectDB()




app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'))




  
app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ✨ http://localhost:${port}`);
});