import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Permissions } from 'src/auth/interfaces/permissions';
import { Request } from 'express';
import { UserRequest } from 'src/auth/interfaces/user-request';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth()
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    createPostDto.user = req.user._id;
    return this.postsService.create(createPostDto);
  }

  @Get()
  @Auth()
  getPosts(@Query("skip") skip:number,@Query("limit") limit:number) {
    return this.postsService.getPosts(skip,limit);
  }

  @Get(':id')
  @Auth()
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Put(':id')
  @Auth()
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req:Request) {
    return this.postsService.updatePost(id, updatePostDto, req);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string, @Req() req:UserRequest) {
    return this.postsService.remove(id, req);
  }
}
