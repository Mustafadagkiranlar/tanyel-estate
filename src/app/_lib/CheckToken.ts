import jwt, { JwtPayload } from 'jsonwebtoken';

export async function verifyToken(token:any) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return decoded;
  } catch (err) {
    return null;
  }
}

export async function checkToken(request: Request){
     // Extract the Authorization header
     const authHeader = request.headers.get('authorization');

     // Extract the Bearer token
     const token = authHeader?.replace('Bearer ', '');
   
     // Verify the token
     const verifiedToken = await verifyToken(token);
  
    if(verifiedToken === null){
      return null;
    }
    return verifiedToken;
}