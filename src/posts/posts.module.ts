import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/posts.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{
      name: Post.name, schema: PostSchema
    }])
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports:[PostsService]
})
export class PostsModule {}
