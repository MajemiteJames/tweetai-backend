import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AutobotService } from '../services/autobot.service';

@Injectable()
export class AutobotTaskService {
  constructor(private readonly autobotService: AutobotService) {}

  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    this.autobotService.createAutobots();
  }
}
