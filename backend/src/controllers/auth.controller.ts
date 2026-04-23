import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { generateAccessToken, generateRefreshToken, refreshTokenService } from "../services/auth.service";
import ms from "ms";

export const login = async (req: Request, res: Response) => {
  
  const {username, password} = req.body;

  // validate to check first that username does exist
  const user = await UserRepository.findOneBy({ username: username });

  if(!user) {
    return res.status(400).json({ message: 'Invalid username does not exist' });
  }

  const accessToken = generateAccessToken({ username })
  const refreshToken = generateRefreshToken({ username })

  if (!refreshToken || !accessToken) {
    return res.status(500).json({ message: 'Unexpected error occurred.' })
  }


  res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // its true when production and its false development mode
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // its none when we made production because its based on different domains, but in development its strict because localhost wants that
      maxAge: ms(process.env.REFRESH_TOKEN_EXPIRATION! as ms.StringValue) 
    });

  res.status(200).json({ 
    success: true, 
    data: user, 
    message: 'Login successful',
    token: accessToken
  });
}

export const logout = async (req: Request, res: Response) => {
      res.clearCookie('refreshToken')
      return res.status(200).json({ message: 'Logged out successfully' });
}

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, username, password } = req.body;

  // validate to check first that username does not exist
  const existingUser = await UserRepository.findOneBy({ username: username }); 

  if(existingUser) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }

  const newUser = UserRepository.create({ first_name, last_name, email, username, password });
  await UserRepository.save(newUser);

  res.status(201).json({ success: true, message: 'User registered successfully' });
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies

  if (!refreshToken) return res.status(403).json({ message: 'Refresh token not provided.' })

  try {
      const newTokens = await refreshTokenService(refreshToken)
      
      res.cookie("refreshToken", newTokens.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          maxAge: ms(process.env.REFRESH_TOKEN_EXPIRATION as ms.StringValue),
      })


      return res.status(200).json({
          message: 'Token refreshed successfully!',
          accessToken: newTokens.accessToken,
      })

  } catch (error) {
      
      console.log("Invalid refresh token")
      next(error)
  }
}