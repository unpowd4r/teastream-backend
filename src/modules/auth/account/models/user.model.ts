import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string

  @Field(() => String)
  email: string

  @Field(() => String)
  password: string

  @Field(() => String)
  username: string

  @Field(() => String)
  displayName: string

  @Field(() => String, { nullable: true })
  avatar: string

  @Field(() => String, { nullable: true })
  bio: string

  @Field(() => Date)
  createAt: string

  @Field(() => Date)
  updateAt: string
}
