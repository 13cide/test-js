import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFile } from './env';
import { FirestoreModule } from './providers/firestore/firestore.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFile(),
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('SA_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}






// @Module({
//   imports: [ConfigModule.forRoot({
//     isGlobal: true,
//     envFilePath: getEnvFile(),
//   })],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}