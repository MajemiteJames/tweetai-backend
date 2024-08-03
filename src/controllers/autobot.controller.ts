import { Controller, Get, Param, Query } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AutobotService } from '../services/autobot.service';

@Controller('autobots')
export class AutobotController {
  constructor(private readonly autobotService: AutobotService) {}

  @Get()
  @Throttle({ default: { limit: 5, ttl: 60 } })
  async findAll(@Query('page') page: number = 1) {
    return this.autobotService.findAutobots(page);
  }

  @Get(':id/posts')
  @Throttle({ default: { limit: 5, ttl: 60 } })
  async findPosts(@Param('id') id: string, @Query('page') page: number = 1) {
    return this.autobotService.findAutobotPosts(id, page);
  }

  @Get(':id/posts/:postId/comments')
  @Throttle({ default: { limit: 5, ttl: 60 } })
  async findComments(
    @Param('postId') postId: string,
    @Query('page') page: number = 1,
  ) {
    return this.autobotService.findPostComments(postId, page);
  }
}
