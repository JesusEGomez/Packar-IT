import { NextResponse } from "next/server";

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dj8g1egez', 
  api_key: '456967315687326', 
  api_secret: 'JvH4A6RhMv85J8DZlnE6p6G_mM0' 
});

export async function POST() {
    return NextResponse.json("imagen subida");
}

https://api.cloudinary.com/v1_1/dj8g1egez