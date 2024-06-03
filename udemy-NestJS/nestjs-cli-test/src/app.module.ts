import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppEntity } from './app.entity';

// const appRepository = TypeOrmModule.getRepository(AppEntity);
// const appRepository = dataSource.getRepository(AppEntity);

// Importing the module
@Module({
  imports: [
    // Importing the module
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test_cli',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AppEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
