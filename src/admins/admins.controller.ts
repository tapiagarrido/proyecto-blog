import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthService } from 'src/auth/auth.service';
import { PostsService } from 'src/posts/posts.service';
import { Permissions } from 'src/auth/interfaces/permissions';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags("Admins")
@ApiBearerAuth()
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

  @ApiParam({
    name: "userId"
  })
  @Delete('users/:userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId)
  }
}
