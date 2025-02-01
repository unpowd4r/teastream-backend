import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { CreateUserInput } from './inputs/create-user.input'

@Injectable()
export class AccountService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    const users = await this.prismaService.user.findMany()

    return users
  }

  public async create(input: CreateUserInput) {
    const { username, email, password } = input

    const isUsernameExists = await this.prismaService.user.findUnique({
      where: {
        username
      }
    })

    if (isUsernameExists) {
      throw new ConflictException('Это имя пользователя уже занято')
    }

    const isEmailExists = await this.prismaService.user.findUnique({
      where: {
        email
      }
    })

    if (isEmailExists) {
      throw new ConflictException(
        'На эту почту уже зарегистрирован пользователь'
      )
    }

    const user = await this.prismaService.user.create({
      data: {
        username,
        email,
        password: await hash(password),
        displayName: username
      }
    })

    return user
  }
}
