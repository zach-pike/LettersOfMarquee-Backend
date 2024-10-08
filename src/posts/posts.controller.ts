import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { NewPostDTO } from './dto/newpost.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Get("old")
    async getOldPosts() {
        return await this.postService.oldPostsFeed();
    }

    @Get("new")
    async getNewPosts() {
        return await this.postService.todaysPostsFeed();
    }

    @Post("create")
    async createPost(@Body() body: NewPostDTO) {
        await this.postService.createPost(body);
    }
}
