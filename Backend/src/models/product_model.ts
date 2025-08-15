import { Schema } from "mongoose";
import mongoose from "mongoose";

interface productInterface {
  name: string;
  description: string; 
  price:number;
  category: string;
  stock: number;
  images: string[];
  ratings: number;
  reviews: string[];
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<productInterface>({
},{ timestamps: true });

export const Product = mongoose.model<productInterface>("Product", productSchema);