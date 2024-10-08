import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop({ required: true })
    postHeader: string;

    @Prop({ required: true })
    posterName: string;

    @Prop({ required: true, index: true })
    postDate: number;

    @Prop({ required: true })
    postBody: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);