import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs'
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginResponse } from './interfaces/login-response';
import { JwtConfig } from './interfaces/jwt-config';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto): Promise<User>{
    try {

      const { password, ...data} = createUserDto;
      const newUser = new this.userModel({
        password: bcrypt.hashSync(password, 10),
        ...data
      });
      await newUser.save();
      return newUser;
      
    } catch (error) {

      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} ya existe`)
      }
      throw new InternalServerErrorException('Un error ha ocurrido');

    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse>{
    const user = await this.create(registerUserDto);

    return{
      user:user,
      token: this.generateJwtToken({id: user._id})
    }
  }

  async login(loginDto: LoginDto):Promise<LoginResponse>{

    const { password, email } = loginDto;

    const userFind = await this.userModel.findOne({email});
    if(!userFind){
      throw new UnauthorizedException("El correo ingresado no se encuentra registrado")
    }

    if(!bcrypt.compareSync(password, userFind.password)){
      throw new UnauthorizedException("La clave ingresada no es valida")
    }

    return{
      user: userFind,
      token: this.generateJwtToken({id:userFind.id})
    }
  }

  async getUsers(): Promise<User[]>{
    try {
      const userList = this.userModel.find({},"-password -createdAt -updatedAt -__v -_id");
      return userList;
    } catch (error) {
      throw new BadRequestException("No se encuentran resultados");
    }
  }

  async getUser(id: string): Promise<User>{
      const isValidId = mongoose.isValidObjectId(id);
      console.log(isValidId)
      if(!isValidId){
        throw new BadRequestException("El ID ingresado no es valido");
      }
      try {        
        const user = await this.userModel.findById(id);
        if(!user){
          throw new NotFoundException("No se encontro un registro con este ID");
        }
        return user;
      } catch (error) {
        throw new InternalServerErrorException("Algo no ha salido bien");
      }
  }

  async updateUser(id:string, updateUserDto: UpdateUserDto): Promise<User>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException("El ID ingresado no es valido");
    }
    try {
      const userUpdate = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true});
      return userUpdate;
    } catch (error) {
      throw new BadRequestException("No se ha logrado actualizar el usuario", error)
    }
  }

  async deleteUser(id:string): Promise<User>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException("El ID ingresado no es valido");
    }
    try {
      const userDelete = await this.userModel.findOneAndDelete({_id:id})
      return userDelete;
    } catch (error) {
      throw new InternalServerErrorException("Algo no salio bien");
    }
  }

  private generateJwtToken(payload: JwtConfig){
    const token = this.jwtService.sign(payload);
    return token;
  }
}
