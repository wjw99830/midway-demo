import { Configuration, App } from '@midwayjs/decorator';
import * as typeorm from '@midwayjs/typeorm';
import * as jwt from '@midwayjs/jwt';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    typeorm,
    jwt,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app!: koa.Application;
}
