import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../../config/config.service';
import { JWTPayload } from '../typings/JWTPayload';
import { RequestUser } from '../typings/RequestUser';

export const authMiddleware = (configService: ConfigService) => (req: Request, res: Response, next: NextFunction) => {
  const { TOKEN_COOKIE_NAME, TOKEN_PREFIX, JWT_SECRET } = configService.values;
  const token: string | undefined = req.cookies[TOKEN_COOKIE_NAME];

  if (token) {
    try {
      const payload = jwt.verify(token.replace(TOKEN_PREFIX, ''), JWT_SECRET) as JWTPayload;

      const user: RequestUser = {
        id: payload.sub,
      };

      req.user = user;
    } catch {
      req.user = null;
    }
  } else {
    req.user = null;
  }

  next();
};
