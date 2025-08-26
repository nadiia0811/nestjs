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
      isGlobal: true,     
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          url: configService.get<string>("POSTGRES_DATABASE_URL"),
          entities: [User],
          synchronize: true,
          ssl: { rejectUnauthorized: false },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
})
export class AppModule {}
