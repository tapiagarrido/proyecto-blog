import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    PostsModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
