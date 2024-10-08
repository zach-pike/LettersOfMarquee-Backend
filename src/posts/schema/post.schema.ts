import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop()
    postHeader: string;

    @Prop()
    posterName: string;

    @Prop({ required: true, index: true })
    postDate: number;

    @Prop()
    postBody: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);