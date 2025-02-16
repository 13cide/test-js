import { Injectable, NotFoundException } from '@nestjs/common';
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
            const rolesArray = this.users.filter(user => user.role === role);
            if (rolesArray.length === 0) throw new NotFoundException('no user with role ' + role)
                return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) throw new NotFoundException('no user with ')
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const newUser = { id: this.users.length + 1, ...createUserDto };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto };
            }
            return user;
        })
        return this.findOne(id);
    }

    delete(id: number) {
        const user = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return user;
    }

}
