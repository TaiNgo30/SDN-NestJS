import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class RegisterUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'john_doe', description: 'Username' })
  username: string;
  @IsNotEmpty()
  @MinLength(6) @MaxLength(12)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password is too weak, choose a stronger password between 6 and 12 characters"
  })
  @ApiProperty({ example: 'StrongPassword123!', description: 'Password' })
  password: string;
}