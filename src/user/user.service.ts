import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){}
  async create(createUserDto: CreateUserDto) {
    const {username,login,password} = createUserDto;
    const salt = await bcrypt.genSalt(5);
    const hashed = await bcrypt.hash(password,salt);
    await this.prisma.user.create({data:{
      username,
      login,
      password:hashed
    }});
    return {message:"Успешно создан"};
  }

  findAll() {
    try{
      return this.prisma.user.findMany({
        select:{
          id:true,
          username:true,
          login:true
        }
      });
    }catch(err){
      return {err};
    }
    
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
