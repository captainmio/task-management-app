// src/entities/mysql/User.ts
import * as dotenv from 'dotenv';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from "bcrypt";
dotenv.config();

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column()
  username!: string;

  @Column({ select: false })
  password!: string;


  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
}