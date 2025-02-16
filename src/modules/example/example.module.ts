import { Module } from '@nestjs/common'

import { ExampleController } from './controllers/example.controller'
import { ExampleDocument } from './entities/example.document'
import { ExampleRepository } from './repositories/example.repositories'
import { ExampleService } from './services/example.service'

@Module({
  imports: [],
  controllers: [ExampleController],
  providers: [ExampleService, ExampleDocument, ExampleRepository],
  exports: [ExampleService, ExampleRepository],
})
/**
 * Данный модуль предназначен в качестве примера организации структуры кода и работы с Firestore
 */
export class ExampleModule {}