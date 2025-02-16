import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "John Doe",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Jane Doe",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Jim Doe",
            "role": "ENGINEER"
        },
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    create(createUserDto: CreateUserDto) {
        const newUser = { id: this.users.length + 1, ...createUserDto };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id);
        this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
        return this.users[userIndex];
    }

    delete(id: number) {
        const userIndex = this.users.findIndex(user => user.id === id);
        const user = this.users[userIndex];
        this.users = this.users.filter(user => user.id !== id);
        return user;
    }

}
