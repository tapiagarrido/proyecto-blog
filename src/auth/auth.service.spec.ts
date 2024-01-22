import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { getModelToken } from "@nestjs/mongoose"
import { User } from "./schemas/user.schema"
import { Model } from "mongoose"


describe("AuthService", () => {

    let authService: AuthService
    let model: Model<User>

    const mockUser = {
        "name": "mariel",
        "surname": "sanchez",
        "phone": "978784512",
        "email": "mariel.sanchez@gmail.com",
        "password": "mariel1988",
        "role": "basic"
    }
    
    const mockAuthService = {
        register: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockAuthService
                }
            ]
        }).compile()

        authService = module.get<AuthService>(AuthService);
        model = module.get<Model<User>>(getModelToken(User.name));
    });

    describe("create", () => {

        it('deberia crear y retornar un usuario nuevo', async () => {
            jest.spyOn(model, "create").mockResolvedValue(mockUser)

            const result = await authService.register(mockUser);

            expect(model.create).toHaveBeenCalledWith(mockUser);
            expect(result).toEqual(mockUser)
        })
    })
});