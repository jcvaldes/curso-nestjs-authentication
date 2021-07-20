import { Inject, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    // private configService: ConfigService,

    // tipado seguro en la configuración
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): string {
    // const apiKey = this.configService.get<string>('API_KEY');
    const apiKey = this.configService.apiKey;
    console.log(this.tasks);
    return `Hello World! ${apiKey}`;
  }
}
