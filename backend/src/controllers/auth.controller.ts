import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";

export const login = async (req: Request, res: Response) => {
  
  const {username, password} = req.body;

  // validate to check first that username does exist
  const user = await UserRepository.findOneBy({ username: username });

  if(!user) {
    return res.status(400).json({ message: 'Invalid username does not exist' });
  }

  res.status(200).json({ success: true, data: user, message: 'Login successful' });
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