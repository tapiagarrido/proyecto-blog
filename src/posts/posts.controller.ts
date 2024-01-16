import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Put, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Request } from 'express';
import { UserRequest } from 'src/auth/interfaces/user-request';
import { filterPosts } from './interfaces/search.interfaces';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags("Posts")
@ApiBearerAuth()
@Auth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    createPostDto.author = req.user._id;
    return this.postsService.create(createPostDto);
  }

  @Get()
  getPosts(@Query("skip") skip: number, @Query("limit") limit: number) {
    return this.postsService.getPosts(skip, limit);
  }

  @Get('search')
  getPostBySearch(@Query("skip") skip: number, @Query("limit") limit: number, @Query("search") search: string) {
    return this.postsService.getPostsBySearch(skip, limit, search)
  }

  @Get('filter')
  getPostByFilter(@Query("skip") skip: number, @Query("limit") limit: number, @Query("author") author: string, @Query("category") category: string) {
    if (author === undefined && category === undefined) throw new NotFoundException("Necesita especificar el parametro de busqueda");
    let searchFilter: filterPosts = {}
    if (author) searchFilter.author = author;
    if (category) searchFilter.category = category;

    return this.postsService.getPostsByFilter(skip, limit, searchFilter)
  }

  @ApiParam({
    name: "postId"
  })
  @Get(':postId')
  getPost(@Param('postId') postId: string) {
    return this.postsService.getPost(postId);
  }

  @ApiParam({
    name: "userId"
  })
  @Get("/user/:userId")
  getPostsById(@Param("userId") userId: string) {
    return this.postsService.getPostsById(userId)
  }

  @ApiParam({
    name: "postId"
  })
  @Put(':postId')
  updatePost(@Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto, @Req() req: Request) {
    return this.postsService.updatePost(postId, updatePostDto, req);
  }

  @ApiParam({
    name: "postId"
  })
  @Delete(':postId')
  remove(@Param('postId') postId: string, @Req() req: UserRequest) {
    return this.postsService.remove(postId, req);
  }
}
