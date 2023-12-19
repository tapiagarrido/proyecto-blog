import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { Auth } from './decorators/auth.decorator';
import { Permissions } from './interfaces/permissions';
import { Request } from 'express';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto){
    return this.authService.create(createUserDto)
  }

  @Post("/register")
  register(@Body() registerUserDto: RegisterUserDto){
    return this.authService.register(registerUserDto);
  }

  @Post("/login")
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }

  @Get()
  @Auth(Permissions.ADMINISTRATOR)
  findAllUsers(){
    return this.authService.getUsers();
  }

  @Get("/:id")
  @Auth()
  findUser(@Param("id") id:string, ){
    return this.authService.getUser(id)
  }

  @Put("/:id")
  @Auth()
  updateUser(@Param("id") id:string, @Body() updateUserDto: UpdateUserDto, @Req() req:Request){
    return this.authService.updateUser(id, updateUserDto, req);
  }

  @Delete("/:id")
  @Auth(Permissions.ADMINISTRATOR)
  deleteUser(@Param("id") id:string){
    return this.authService.deleteUser(id)
  }
}
