import { Request, Response } from "express";
import { Document } from "mongoose";

// global.d.ts
declare global {
  interface AppRequest extends Request {
    // Define your global type here
    user: Document;
  }
}
