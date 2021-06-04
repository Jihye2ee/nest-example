import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  const config = new DocumentBuilder()
  .setTitle('JUNO DEV')
  .setDescription('JUNO API description')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
  // const schema = await buildSchema({

  // })
  // // Validation
  // app.useGlobalPipes(new ValidationPipe());

  // // Swagger Api
  // if (process.env.SWAGGER_ENABLE === '1') {
  //   const options = new DocumentBuilder()
  //     .setTitle(process.env.SWAGGER_TITLE || 'Nestjs')
  //     .setDescription(
  //       process.env.SWAGGER_DESCRIPTION || 'The nestjs API description'
  //     )
  //     .setVersion(process.env.SWAGGER_VERSION || '1.0')
  //     .build();
  //   const document = SwaggerModule.createDocument(app, options);

  //   SwaggerModule.setup(process.env.SWAGGER_PATH || 'api', app, document);
  // }

  // Cors
  //if (process.env.CORS_ENABLE === '1') {
    app.enableCors();
  //}
  
  
  await app.listen(3000);

}
bootstrap();
