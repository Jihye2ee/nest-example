import { Field, ObjectType } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class Post {
  @Field(type => String)
  title: string;

  @Field(type => String)
  content: string;

  @Field(type => Boolean)
  published: boolean;

  @Field(type => User)
  author: User;
}