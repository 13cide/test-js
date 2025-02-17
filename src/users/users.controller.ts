import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { skip } from 'node:test';

@SkipThrottle()
@Controller('users')
export class UsersController {
    
    constructor(private readonly usersService: UsersService) {}

    @SkipThrottle({default: false})
    @Get() // GET /users or /users?role=value&age=42
    findAll(@Query("role") role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }

    @Throttle({short: {ttl: 1000, limit: 1}})
    @Get(':id') // GET /users/:id
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post() // POST /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') // GET DELETE /users/:id
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
