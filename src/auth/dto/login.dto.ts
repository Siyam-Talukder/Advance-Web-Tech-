import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required to login' })
  @IsEmail({}, { message: 'Please provide a valid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required to login' })
  @IsString()
  password: string;
}