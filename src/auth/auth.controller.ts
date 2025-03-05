import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "../DTO/registerUser.dto";
import { UserLoginDto } from "../DTO/userLogin.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


//http://localhost:3000/api/auth
@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('register')
  @ApiOperation({ summary: 'User register' })
  @ApiResponse({ status: 201, description: 'User registed in successfully' })
  registration(@Body(ValidationPipe) regDTO: RegisterUserDto) {
    return this.authService.registerUser(regDTO);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  signin(@Body(ValidationPipe) loginDTO: UserLoginDto) {
    return this.authService.loginUser(loginDTO);
  }

}