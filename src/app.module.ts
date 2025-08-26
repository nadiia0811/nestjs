import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./entity/User";


@Module({
   controllers: [AppController],
   providers: [AppService],
   imports: [
        ConfigModule.forRoot({
          isGlobal: true
        }),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get("DB_HOST"),
        port: Number(configService.get("DB_PORT")),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [User], 
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
     TypeOrmModule.forFeature([User]),
     UsersModule  
   ]
})
export class AppModule {

}