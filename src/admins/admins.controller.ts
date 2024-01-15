import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthService } from 'src/auth/auth.service';
import { PostsService } from 'src/posts/posts.service';
import { Permissions } from 'src/auth/interfaces/permissions';

@Auth(Permissions.ADMINISTRATOR)
@Controller('admins')
export class AdminsController {
  constructor(
    private readonly postsService: PostsService, 
    private readonly usersService: AuthService) {}

  @Get("users")
  getAllUsersAdmin() {
    return this.usersService.getUsers();
  }

  @Get('posts')
  getAllPostAdmin() {
    return this.postsService.getPosts();
  }

  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id)
  }
}
