import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({
      envFilePath:`.env.${process.env.NODE_ENV}`
    }),
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_PASSWORD,
      signOptions: {
        expiresIn: '7d'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule,AuthService]
})
export class AuthModule {}
