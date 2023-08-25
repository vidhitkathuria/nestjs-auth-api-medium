import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  randomNumDbs = Math.floor(Math.random() * 10);
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('get-number-cache')
  async getNumber(): Promise<any> {
    const val = await this.cacheManager.get('number');
    if (val) {
      return {
        data: val,
        FromRedis: 'this is loaded from redis cache',
      };
    }

    if (!val) {
      await this.cacheManager.set('number', this.randomNumDbs, { ttl: 1000 });
      return {
        data: this.randomNumDbs,
        FromRandomNumDbs: 'this is loaded from randomNumDbs',
      };
    }
  }
}
