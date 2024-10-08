import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    username: string;
    
    @Prop({ required: true })
    realName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    hash: string;

    @Prop({ required: true })
    dateOfCreation: number;
}

export const UserSchema = SchemaFactory.createForClass(User);