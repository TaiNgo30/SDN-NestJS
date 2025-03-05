import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ example: 'john_doe', description: 'Username' })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ example: 'StrongPassword123!', description: 'Password' })
  @IsNotEmpty()
  password: string;
}