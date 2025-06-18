import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
        level: process.env.ENABLE_LOGS === 'true' ? 'info' : 'silent',
        genReqId: () => uuidv4(),
        customProps: (req) => ({
          requestId: req.id,
        }),
      },
    }),
  ],
  providers: [],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
