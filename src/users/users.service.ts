import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDTO } from './dto/signup.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(data: SignUpDTO): Promise<[boolean, string]> {
        // Username rules
        // 1. no less than 4 characters
        // 2. no more than 10 characters
        // 3. only valid english letters and numbers
        // 4. no spaces

        // Name rules
        // 1. Name must be atleast 4 characters
        // 2. Name must be not more than 20 characters
        // 3. Only english letters (no spaces or special charaters)

        // Password rules
        // minumum 8 characters (school password length)
        // maximum of 64 characters
        // atleast one number or special character

        // CHECK EVERYTHING FOR NULL

        if (!data) return [false, "Object Null #1"];
        if (!data.username) return [false, "Object Null #2"];
        if (!data.realName) return [false, "Object Null #3"];
        if (!data.email) return [false, "Object Null #4"];
        if (!data.password) return [false, "Object Null #5"];

        // Validate username
        const { username, realName, email, password } = data;

        // Username
        if (username.length < 4) return [false, "Username Too Short (4 Character Min)"];
        if (username.length > 10) return [false, "Username Too Long (10 Character Max)"];
        if (!/^[a-zA-Z0-9]+$/.test(username)) return [false, "Username contains spaces or non-english characters"];

        // Real name
        if (realName.length < 4)  return [false, "Real name length too short! (4 Minimum)"];
        if (realName.length > 20)  return [false, "Real name length too long! (4 Minimum)"];
        if (!/^[A-Za-z]+ [A-Za-z]+$/.test(realName)) return [false, "Name must be formatted in the form \"FirstName LastName\" and contain only english letters"];

        // Email
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return [false, "Invalid email"];

        // Password
        if (password.length < 8) return [false, "Password too short (8 Character Min)"];
        if (password.length > 64) return [false, "Password too long (64 Character Max)"];
        if (!/^(?=.*[0-9!@#$%^&*])/.test(password)) return [false, "Password must contain a number or special character"];

        // Everything is validated if we got here
        // Create password hash

        let hash = await bcrypt.hash(password, 10);

        // Create user model

        let user = new this.userModel({
            username,
            realName,
            email,
            hash,
            dateOfCreation: Date.now()
        });

        if ((await user.save()).isNew) {
            return [true, "OK"];
        } else {
            return [false, "Failed to save user to database"];
        }
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return await this.userModel.findOne({ username }).exec();
    }

    async checkPassword(user: User, checkingPassword: string): Promise<boolean> {
        return await bcrypt.compare(checkingPassword, user.hash);
    }
}
