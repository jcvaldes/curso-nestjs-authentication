import { Global, Module } from '@nestjs/common';
const API_KEY = '1234556';
// Módulo global
@Global()
@Module({
  providers: [{ provide: 'API_KEY', useValue: API_KEY }],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
