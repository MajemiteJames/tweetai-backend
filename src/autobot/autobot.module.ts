import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutobotService } from '../services/autobot.service';
import { AutobotController } from '../controllers/autobot.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { Post } from 'src/entities/post.entity';
import { Autobot } from 'src/entities/autobot.entity';
import { Comment } from 'src/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Autobot, Comment]), SupabaseModule],
  providers: [AutobotService],
  controllers: [AutobotController],
})
export class AutobotModule {}
