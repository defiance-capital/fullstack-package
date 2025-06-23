/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppModule } from '@/framework/app.module';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ApiProperty,
  DocumentBuilder,
  getSchemaPath,
  OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';

class SuccessResponse<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data: T;
}

class InternalServerErrorResponse {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 'INTERNAL_SERVER_ERROR' })
  errorCode: string;

  @ApiProperty({ example: 'An unexpected error occurred' })
  message: string;
}

async function generateSwagger() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Fullstack Homework API')
    .addGlobalResponse({
      status: 500,
      schema: { $ref: getSchemaPath(InternalServerErrorResponse) },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [SuccessResponse, InternalServerErrorResponse],
  });
  wrapAllResponses(document);
  SwaggerModule.setup('api', app, document);
  // await app.close();
  await app.listen(process.env.PORT ?? 3000);
}

function wrapAllResponses(doc: OpenAPIObject) {
  const envelopeRef = getSchemaPath(SuccessResponse);

  for (const path of Object.values(doc.paths)) {
    for (const method of Object.values<any>(path)) {
      const responses = method?.responses;
      if (!responses) {
        continue;
      }

      for (const [status, response] of Object.entries<any>(responses)) {
        if (!/^2\d\d$/.test(status)) {
          continue;
        }

        const content = response?.content?.['application/json'];
        if (!content || !content.schema || content.schema.allOf) {
          continue;
        }

        content.schema = {
          allOf: [{ $ref: envelopeRef }, { properties: { data: content.schema } }],
        };
      }
    }
  }
}

void generateSwagger();
