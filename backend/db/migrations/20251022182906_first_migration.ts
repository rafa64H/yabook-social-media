import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", function (table) {
      table.bigIncrements("id").primary();
      table.string("username", 20).notNullable();
      table.string("email", 255).notNullable();
      table.string("password", 255).notNullable();
      table.string("name", 100).notNullable();
      table.date("created_at");
      table.date("updated_at");
      table.unique(["username", "email"]);
    })

    .createTable("posts", function (table) {
      table.bigIncrements("id").primary();
      table.string("title", 100).notNullable();
      table.string("content", 1000);
      table.date("created_at").notNullable();
      table.date("updated_at").notNullable();
      table.bigInteger("user_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
    })

    .createTable("comments", function (table) {
      table.bigIncrements("id").primary();
      table.string("content", 500).notNullable();
      table.bigInteger("user_id").notNullable();
      table.bigInteger("post_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
      table.foreign("post_id").references("id").inTable("posts");
    })

    .createTable("replies", function (table) {
      table.bigIncrements("id").primary();
      table.string("content", 500).notNullable();
      table.bigInteger("user_id").notNullable();
      table.bigInteger("comment_id").notNullable();
      table.bigInteger("post_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
      table.foreign("comment_id").references("id").inTable("comments");
      table.foreign("post_id").references("id").inTable("posts");
    })

    .createTable("profile_pictures", function (table) {
      table.bigIncrements("id").primary();
      table.text("image_url").notNullable();
      table.text("image_path").notNullable();
      table.bigInteger("user_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
    })

    .createTable("comments_multimedia", function (table) {
      table.bigIncrements("id").primary();
      table.text("media_url").notNullable();
      table.text("media_path").notNullable();
      table.bigInteger("user_id").notNullable();
      table.bigInteger("comment_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
      table.foreign("comment_id").references("id").inTable("comments");
    })

    .createTable("replies_multimedia", function (table) {
      table.bigIncrements("id").primary();
      table.text("media_url").notNullable();
      table.text("media_path").notNullable();
      table.bigInteger("user_id").notNullable();
      table.bigInteger("reply_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
      table.foreign("reply_id").references("id").inTable("replies");
    })

    .createTable("posts_multimedia", function (table) {
      table.bigIncrements("id").primary();
      table.text("media_url").notNullable();
      table.text("media_path").notNullable();
      table.bigInteger("user_id").notNullable();
      table.bigInteger("post_id").notNullable();
      table.foreign("user_id").references("id").inTable("users");
      table.foreign("post_id").references("id").inTable("posts");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("posts_multimedia")
    .dropTableIfExists("replies_multimedia")
    .dropTableIfExists("comments_multimedia")
    .dropTableIfExists("profile_pictures")
    .dropTableIfExists("replies")
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
}
