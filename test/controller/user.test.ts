import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Application, Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {
  let app: Application;

  beforeAll(async () => {
    app = await createApp<Framework>();
    await createHttpRequest(app)
      .post('/api/user/register')
      .send({ username: 'jack', password: 'redballoon' });
  });

  afterAll(() => close(app));

  describe('POST /api/user/login', () => {
    it('should login success', async () => {
      const result = await createHttpRequest(app)
        .post('/api/user/login')
        .timeout(1000)
        .send({ username: 'jack', password: 'redballoon' });

      expect(result.status).toBe(200);
      expect(result.body.code).toBe(200);
      expect(result.body.result).toBe('success');
      expect(result.body.message).toBe('登录成功');
      expect(typeof result.body.data.token === 'string').toBe(true);
    });

    it('should require password', async () => {
      const result = await createHttpRequest(app)
        .post('/api/user/login')
        .timeout(1000)
        .send({ username: 'jackson' });

      expect(result.status).toBe(422);
    });

    it('should require username', async () => {
      const result = await createHttpRequest(app)
        .post('/api/user/login')
        .timeout(1000)
        .send({ password: 'redballoon' });

      expect(result.status).toBe(422);
    });

    it('should response error when username invalid', async () => {
      const result = await createHttpRequest(app)
        .post('/api/user/login')
        .timeout(1000)
        .send({ username: 'jackson', password: 'redballoon' });

      expect(result.status).toBe(200);
      expect(result.body.code).toBe(400);
      expect(result.body.result).toBe('error');
      expect(result.body.message).toBe('账号或密码不正确');
      expect(result.body.data).toBe(null);
    });

    it('should response error when username valid but password invalid', async () => {
      const result = await createHttpRequest(app)
        .post('/api/user/login')
        .timeout(1000)
        .send({ username: 'jack', password: 'imjack' });

      expect(result.status).toBe(200);
      expect(result.body.code).toBe(400);
      expect(result.body.result).toBe('error');
      expect(result.body.message).toBe('账号或密码不正确');
      expect(result.body.data).toBe(null);
    });
  });
});
