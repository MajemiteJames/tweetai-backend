import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { SupabaseModule } from './supabase/supabase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutobotModule } from './autobot/autobot.module';
import { Autobot } from './entities/autobot.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Autobot, Post, Comment],
      synchronize: true, // Set to false in production
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 5,
      },
    ]),
    SupabaseModule,
    AutobotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
