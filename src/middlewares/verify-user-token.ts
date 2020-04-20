import { verify } from '../utils/jwt-util';
import { Request, Response, NextFunction } from "express";

const checkAuth = (forRole?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const tokenId: any = req.headers['x-user-token'];
    let status = false;
  
    try {
      const loggingUser: any = verify(tokenId);
      const { role } = loggingUser;

      if (forRole && forRole !== role) {
        throw new Error('Access denied');
      }
      
      status = true;
  
    } catch (ignore) {
      // ignore
    }
  
    if (!status) {
      throw new Error('Access denied');
    }
    next();
  };
}

export default checkAuth;

