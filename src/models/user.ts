import { Field, ObjectType } from 'type-graphql';
import { Post } from './post';


@ObjectType()
export class User {
  @Field(type => String)
  email: string;

  @Field(type => String, { nullable: true })
  firstname?: string;

  @Field(type => String, { nullable: true })
  lastname?: string;

  @Field(type => [Post])
  posts: Post[];

  password: string;
}