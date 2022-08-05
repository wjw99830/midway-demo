import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';

export default {
  keys: '7819042901_7429102844_38910239412',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        logging: false,
        entities: [UserEntity],
      },
    },
  },
  jwt: {
    secret: 'H897HJCI81289-21839AD8897JHN-SECRET',
    expiresIn: '2d',
  },
} as MidwayConfig;
