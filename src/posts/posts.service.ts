import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/posts.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Permissions } from 'src/auth/interfaces/permissions';
import { UserRequest } from 'src/auth/interfaces/user-request';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post.name)
    private postModel: Model<Post>
  ) { }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const newPost = this.postModel.create(createPostDto)
      return newPost;
    } catch (error) {
      throw new InternalServerErrorException("Algo ha salido mal");
    }
  }

  async getPosts(skip: number = 0, limit: number = 10): Promise<Post[]> {
    try {
      const postsList = this.postModel.find({}, "-__v -_id").skip(skip).limit(limit);
      return postsList;
    } catch (error) {
      throw new BadRequestException("No se encuentran resultados");
    }
  }

  async getPost(id: string): Promise<Post> {

    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) throw new BadRequestException("El ID ingresado no es valido");

    try {
      const post = await this.postModel.findById(id);
      if (!post) throw new NotFoundException("No existe registro con el ID ingresado");
      return post;
    } catch (error) {
      throw new InternalServerErrorException("Algo no ha salido bien");
    }

  }

  async updatePost(id: string, updatePostDto: UpdatePostDto, req): Promise<Post> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) throw new BadRequestException("El ID ingresado no es valido");
    try {
      const { _id, role } = req.user
      if (_id.toString() !== id && role !== Permissions.ADMINISTRATOR) throw new UnauthorizedException("Usted no puede editar información de otros usuarios");
      const updatedPost = this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
      return updatedPost;
    } catch (error) {
      throw new InternalServerErrorException("Algo ha salido mal", error)
    }
  }

  async remove(id: string, req: UserRequest): Promise<Post> {
    const { _id: currentUserId, role } = req.user;
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw new BadRequestException("El ID ingresado no es valido");
    const postFind = await this.getPost(id);
    if (!postFind) throw new NotFoundException("No se encuentra un registro con el ID ingresado");
    if (postFind.author.toString() !== currentUserId.toString() && role !== Permissions.ADMINISTRATOR) throw new BadRequestException("No puedes eliminar post de otros usuarios");
    try {
      const deletedPost = await this.postModel.findOneAndDelete({ _id: id });
      return deletedPost;
    } catch (error) {
      throw new InternalServerErrorException("Algo ha salido mal", error)
    }
  }
}
