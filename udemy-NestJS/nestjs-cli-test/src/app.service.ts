import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppEntity } from './app.entity';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }
  constructor(
    @InjectRepository(AppEntity)
    private appsRepository: AppEntity,
  ) {
    console.log('AppService constructor');
  }
}
