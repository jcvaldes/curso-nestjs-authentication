import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';
import config from 'src/config';
const API_KEY = '1234556';

// client.connect();
// client.query('SELECT * FROM tasks', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });
// Módulo global
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        // const { user, host, dbName, password, port } = configService.mysql;
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          // type: 'mysql',
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          // con  synchronize  y autoLoadEntities nuestras entidades se sicnonizan con la base de datos cuando se crean y
          // no arrojan errores de RepositoryNotFoundError
          synchronize: false, // true solo para desarrollo usarlo pero no en prod porque borra todos los datos
          autoLoadEntities: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    { provide: 'API_KEY', useValue: API_KEY },
    {
      provide: 'PG',
      // useValue: client,
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
