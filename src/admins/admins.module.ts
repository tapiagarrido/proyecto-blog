import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports:[AuthModule,PostsModule],
  controllers: [AdminsController],
  providers: [],
})
export class AdminsModule {}
