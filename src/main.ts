import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // todos los queries params que tengan un numero lo convierte a numero
      // lo transforma de forma implicita
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // La uso para poner @Exclude en entities para el response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // config swagger
  const options = new DocumentBuilder()
    .setTitle('Nest Modular - API')
    .setDescription('API para ecommerce')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  app.enableCors();
  await app.listen(process.env.PORT || AppModule.port);
}
bootstrap();
