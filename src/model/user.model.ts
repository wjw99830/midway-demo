import { Provide } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";

@Provide()
export class UserModel {
    @InjectEntityModel(UserEntity)
    userRepo!: Repository<UserEntity>;

    insert(username: string, password: string) {
      const user = new UserEntity();
      user.username = username;
      user.password = password;
      return this.userRepo.save(user);
    }
  
    /**
     * 根据用户名和密码获取用户信息
     * @param username {String} 用户名
     * @param password {String} 用户密码
     */
    async getUserByUsernameAndPassword(username: string, password: string): Promise<UserEntity> {
      const user = await this.userRepo.findOneBy({ username });
      if (!user) {
        throw new Error('Invalid username');
      }

      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      return user;
    }
  }