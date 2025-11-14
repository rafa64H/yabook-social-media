import { Knex } from "knex";

declare module "knex/types/tables" {
  interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    name: string;
    created_at?: Date;
    updated_at?: Date;
  }

  interface ProfilePicture {
    id: number;
    image_url: string;
    image_path: string;
    user_id: number;
  }

  interface Post {
    id: number;
    title: string;
    content?: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
  }

  interface PostMultimedia {
    id: number;
    media_url: string;
    media_path: string;
    user_id: number;
    post_id: number;
  }

  interface Comment {
    id: number;
    content: string;
    user_id: number;
    post_id: number;
  }

  interface CommentMultimedia {
    id: number;
    media_url: string;
    media_path: string;
    user_id: number;
    comment_id: number;
  }

  interface Reply {
    id: number;
    content: string;
    user_id: number;
    comment_id: number;
    post_id: number;
  }

  interface ReplyMultimedia {
    id: number;
    media_url: string;
    media_path: string;
    user_id: number;
    reply_id: number;
  }

  interface Tables {
    users: User;
    profile_pictures: ProfilePicture;
    posts: Post;
    posts_multimedia: PostMultimedia;
    comments: Comment;
    comments_multimedia: CommentMultimedia;
    replies: Reply;
    replies_multimedia: ReplyMultimedia;
  }
}

export class RequestError extends Error {
  public statusCode: number;
  validationErrors?: string[];
  constructor(
    message: string,
    statusCode: number,
    validationErrors?: string[]
  ) {
    super(message);

    this.name = "RequestError";
    this.statusCode = statusCode;
    if (validationErrors) this.validationErrors = validationErrors;

    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
