import { Body, Controller, Get, NotFoundException, Param, ParseBoolPipe, Patch, Post, Query } from '@nestjs/common'

import { ExampleFilter, ExampleRequestBody} from '../dto'
import { ExampleDocument } from '../entities/example.document'
import { ExampleService } from '../services/example.service'

@Controller('v1/example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('/')
  async getList(@Query('isPublished', ParseBoolPipe) isPublished?: boolean): Promise<ExampleDocument[]> {
    const response = await this.exampleService.getList({ isPublished })

    if (!response?.length) {
      throw new NotFoundException('Examples are not exist')
    }

    return response
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<ExampleDocument> {
    const response = await this.exampleService.getItem(id)

    if (!response) {
      throw new NotFoundException('Example does not exist')
    }

    return response
  }

  @Post('/')
  async create(@Body() body: ExampleRequestBody): Promise<ExampleDocument> {
    return this.exampleService.create(body)
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: ExampleRequestBody): Promise<ExampleDocument> {
    return this.exampleService.update(id, body)
  }

  @Patch('/publish/:id')
  async togglePublish(@Param('id') id: string): Promise<ExampleDocument> {
    return this.exampleService.togglePublish(id)
  }
}