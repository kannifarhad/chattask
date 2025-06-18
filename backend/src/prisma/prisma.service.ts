import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

declare module '@prisma/client' {
  interface PrismaClient {
    $on(event: 'query', callback: (event: Prisma.QueryEvent) => any): void;
    $on(
      event: 'error' | 'warn' | 'info',
      callback: (event: Prisma.LogEvent) => any,
    ): void;
  }
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @InjectPinoLogger(PrismaService.name)
    private readonly logger: PinoLogger,
  ) {
    super({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    });

    this.$on('query', (e: Prisma.QueryEvent) => {
      this.logger.info({
        msg: 'Prisma Query',
        query: e.query,
        params: e.params,
        duration: e.duration,
      });
    });

    this.$on('error', (e: Prisma.LogEvent) => {
      this.logger.error({
        msg: 'Prisma Error',
        target: e.target,
      });
    });

    this.$on('warn', (e: Prisma.LogEvent) => {
      this.logger.warn({
        msg: 'Prisma Warning',
        target: e.target,
      });
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  cleanDb() {
    return this.$transaction([this.message.deleteMany()]);
  }
}
