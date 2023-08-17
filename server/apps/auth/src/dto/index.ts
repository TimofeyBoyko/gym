import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CheckEmailDto {
  @ApiProperty({ description: 'User email', nullable: false })
  @IsEmail()
  email: string;
}

export class LoginDto {
  @ApiProperty({ description: 'User email', nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RegistrationDto {
  @ApiProperty({ description: 'User email', nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', nullable: false })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'User last name', nullable: false })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'User first name', nullable: false })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User birthday (ISO string)', nullable: false })
  @IsNotEmpty()
  @IsString()
  birthday: string;
}
