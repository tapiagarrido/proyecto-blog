import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { Auth } from './decorators/auth.decorator';

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
  @Auth({admin:true})
  findAllUsers(){
    return this.authService.getUsers();
  }

  @Get("/:id")
  @Auth({author:true})
  findUser(@Param("id") id:string){
    return this.authService.getUser(id)
  }

  @UseGuards(AuthGuard)
  @Put("/:id")
  updateUser(@Param("id") id:string, @Body() updateUserDto: UpdateUserDto){
    return this.authService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete("/:id")
  deleteUser(@Param("id") id:string){
    return this.authService.deleteUser(id)
  }
}
