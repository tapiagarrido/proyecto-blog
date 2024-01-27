"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const permissions_1 = require("./interfaces/permissions");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        try {
            const { password, ...data } = createUserDto;
            const newUser = new this.userModel({
                password: bcrypt.hashSync(password, 10),
                ...data
            });
            await newUser.save();
            return newUser;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.BadRequestException(`${createUserDto.email} ya existe`);
            }
            throw new common_1.InternalServerErrorException('Un error ha ocurrido');
        }
    }
    async register(registerUserDto) {
        const user = await this.create(registerUserDto);
        return {
            user: user,
            token: this.generateJwtToken({ id: user._id })
        };
    }
    async login(loginDto) {
        const { password, email } = loginDto;
        const userFind = await this.userModel.findOne({ email });
        if (!userFind) {
            throw new common_1.UnauthorizedException("El correo ingresado no se encuentra registrado");
        }
        if (!bcrypt.compareSync(password, userFind.password)) {
            throw new common_1.UnauthorizedException("La clave ingresada no es valida");
        }
        return {
            user: userFind,
            token: this.generateJwtToken({ id: userFind.id })
        };
    }
    async getUsers() {
        try {
            const userList = await this.userModel.find({}, "-password -createdAt -updatedAt -__v -_id");
            return userList;
        }
        catch (error) {
            throw new common_1.BadRequestException("No se encuentran resultados");
        }
    }
    async getUser(id) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException("El ID ingresado no es valido");
        }
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new common_1.NotFoundException("No se encontro un registro con este ID");
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Algo no ha salido bien");
        }
    }
    async updateUser(id, updateUserDto, req) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException("El ID ingresado no es valido");
        }
        const { _id: currentUserId, role } = req.user;
        console.log(req.user);
        if (currentUserId.toString() !== id && role !== permissions_1.Permissions.ADMINISTRATOR)
            throw new common_1.UnauthorizedException("No tienes acceso a editar otros usuarios");
        try {
            const userUpdate = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
            return userUpdate;
        }
        catch (error) {
            throw new common_1.BadRequestException("No se ha logrado actualizar el usuario", error);
        }
    }
    async deleteUser(id) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException("El ID ingresado no es valido");
        }
        try {
            const userDelete = await this.userModel.findOneAndDelete({ _id: id });
            return userDelete;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Algo no salio bien");
        }
    }
    generateJwtToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map