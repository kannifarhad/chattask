import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('healthcheck')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description: 'Health check response',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  getHello(): { message: string } {
    return this.appService.getHello();
  }
}
