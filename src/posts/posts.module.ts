import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema';
import { PostsController } from './posts.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema, collection: "posts" }])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
