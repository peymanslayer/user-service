/* eslint-disable prettier/prettier */
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserDto } from './dtos/update.user.dto';
import { UserRoot } from './user.model';
import { UserDocument } from './schema/user.schema';

export class UserRepo  {
  constructor(
  @InjectModel('user')  private  model: Model<User>,
  ) {}

  async getAllUser(): Promise<User[]> {
    const findAll = await this.model.find();
    return findAll;
  }
  async getUser(email:string): Promise<User | string> {
    console.log(email);
    
    const findOne = await this.model.findOne({email:email});
    
      return findOne;
  }
  async createUser(user: CreateUserDto)   {
    const insertOne = await this.model.create(user);
    const root=new UserRoot(insertOne.id)
    root.setData(insertOne);
    return root;
  }
  async updateUser(userId: Types.ObjectId,user?: UpdateUserDto,) {
    
    const updateOne = await this.model.findByIdAndUpdate(userId,user,{new:true});
    const root=new UserRoot(updateOne.id);
    root.setData(updateOne);
    return root;
  }
  async DeleteUser(userId: Types.ObjectId) {
    const deleteOne = await this.model.findByIdAndDelete(userId);
    const root=new UserRoot(deleteOne.id);
    root.setData(deleteOne);
    return root;
  }
}
