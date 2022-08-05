import { Inject, Controller, Post, Body, Query } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { UserLoginDTO } from '../dto/user.dto';
import { UserModel } from '../model/user.model';

@Controller('/api/user')
export class UserController {
  @Inject()
  ctx!: Context;

  @Inject()
  userModel!: UserModel;

  @Inject()
  jwtService!: JwtService;

  @Post('/register')
  @Validate()
  async register(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    const { id } = await this.userModel.insert(username, password);
    return { code: 200, result: 'success', message: '注册成功', data: { id } };
  }

  @Post('/login')
  @Validate()
  async login(@Body() body: UserLoginDTO) {
    try {
      const user = await this.userModel.getUserByUsernameAndPassword(
        body.username,
        body.password
      );

      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: {
          token: await this.jwtService.sign({
            id: user.id,
            username: user.username,
          }),
        },
      };
    } catch (error) {
      return {
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null,
      };
    }
  }
}
