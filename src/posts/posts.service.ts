import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { NewPostDTO } from './dto/newpost.dto';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async oldPostsFeed(): Promise<Post[]> {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        return await this.postModel.find({ postDate: { $lt : now.getTime() }})
                                   .limit(10)
                                   .sort({ postDate: -1 })
                                   .exec();
    }

    async todaysPostsFeed(): Promise<Post[] | null> {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        return await this.postModel.find({ postDate: { $gt: now.getTime() } })
                                   .limit(10)
                                   .sort({ postDate: -1 })
                                   .exec();
    }

    async createPost(data: NewPostDTO) {
        await new this.postModel(data).save();
    }
}
