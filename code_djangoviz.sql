
-- https://gh.atlasgo.cloud/explore

table "backend_profile" {
  schema = schema.public
  column "id" {
    null = false
    type = bigint
    identity {
      generated = BY_DEFAULT
    }
  }
  column "full_name" {
    null = false
    type = character_varying(255)
  }
  column "location" {
    null = false
    type = character_varying(100)
  }
  column "cohort" {
    null = false
    type = character_varying(100)
  }
  column "updated" {
    null = false
    type = boolean
  }
  column "bio" {
    null = false
    type = text
  }
  column "facebook" {
    null = true
    type = character_varying(200)
  }
  column "twitter" {
    null = true
    type = character_varying(200)
  }
  column "linkedin" {
    null = true
    type = character_varying(200)
  }
  column "avatar" {
    null = true
    type = character_varying(200)
  }
  column "user_id" {
    null = false
    type = integer
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "backend_profile_user_id_8fc3ddb6_fk_auth_user_id" {
    columns     = [column.user_id]
    ref_columns = [table.auth_user.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  unique "backend_profile_user_id_key" {
    columns = [column.user_id]
  }
}

table "auth_user" {
  schema = schema.public
  column "id" {
    null = false
    type = integer
    identity {
      generated = BY_DEFAULT
    }
  }
  column "username" {
    null = false
    type = character_varying(150)
  }
  column "email" {
    null = false
    type = character_varying(254)
  }
  primary_key {
    columns = [column.id]
  }
  index "auth_user_username_6821ab7c_like" {
    on {
      column = column.username
      ops    = varchar_pattern_ops
    }
  }
  unique "auth_user_username_key" {
    columns = [column.username]
  }
}
table "projects_comment" {
  schema = schema.public
  column "id" {
    null = false
    type = bigint
    identity {
      generated = BY_DEFAULT
    }
  }
  column "content" {
    null = false
    type = text
  }
  column "created_at" {
    null = false
    type = timestamptz
  }
  column "user_id" {
    null = false
    type = integer
  }
  column "project_id" {
    null = false
    type = bigint
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "projects_comment_project_id_220d4b34_fk_projects_project_id" {
    columns     = [column.project_id]
    ref_columns = [table.projects_project.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  foreign_key "projects_comment_user_id_b974446a_fk_auth_user_id" {
    columns     = [column.user_id]
    ref_columns = [table.auth_user.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  index "projects_comment_project_id_220d4b34" {
    columns = [column.project_id]
  }
  index "projects_comment_user_id_b974446a" {
    columns = [column.user_id]
  }
}
table "projects_project" {
  schema = schema.public
  column "id" {
    null = false
    type = bigint
    identity {
      generated = BY_DEFAULT
    }
  }
  column "projectTitle" {
    null = false
    type = character_varying(100)
  }
  column "authors" {
    null = false
    type = character_varying(255)
  }
  column "description" {
    null = false
    type = text
  }
  column "tags" {
    null = false
    type = character_varying(255)
  }
  column "githubRepos" {
    null = false
    type = character_varying(200)
  }
  column "liveProject" {
    null = false
    type = character_varying(200)
  }
  column "imgFile" {
    null = false
    type = character_varying(100)
  }
  column "user_id" {
    null = false
    type = integer
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "projects_project_user_id_719f19dd_fk_auth_user_id" {
    columns     = [column.user_id]
    ref_columns = [table.auth_user.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  index "projects_project_user_id_719f19dd" {
    columns = [column.user_id]
  }
}
table "projects_project_likes" {
  schema = schema.public
  column "id" {
    null = false
    type = bigint
    identity {
      generated = BY_DEFAULT
    }
  }
  column "project_id" {
    null = false
    type = bigint
  }
  column "user_id" {
    null = false
    type = integer
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "projects_project_lik_project_id_40056201_fk_projects_" {
    columns     = [column.project_id]
    ref_columns = [table.projects_project.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  foreign_key "projects_project_likes_user_id_12f67cd7_fk_auth_user_id" {
    columns     = [column.user_id]
    ref_columns = [table.auth_user.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  index "projects_project_likes_project_id_40056201" {
    columns = [column.project_id]
  }
  index "projects_project_likes_user_id_12f67cd7" {
    columns = [column.user_id]
  }
  unique "projects_project_likes_project_id_user_id_4e9caaab_uniq" {
    columns = [column.project_id, column.user_id]
  }
}
table "projects_project_users" {
  schema = schema.public
  column "id" {
    null = false
    type = bigint
    identity {
      generated = BY_DEFAULT
    }
  }
  column "project_id" {
    null = false
    type = bigint
  }
  column "user_id" {
    null = false
    type = integer
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "projects_project_use_project_id_4ce8cb7b_fk_projects_" {
    columns     = [column.project_id]
    ref_columns = [table.projects_project.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  foreign_key "projects_project_users_user_id_738a7cbf_fk_auth_user_id" {
    columns     = [column.user_id]
    ref_columns = [table.auth_user.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  index "projects_project_users_project_id_4ce8cb7b" {
    columns = [column.project_id]
  }
  index "projects_project_users_user_id_738a7cbf" {
    columns = [column.user_id]
  }
  unique "projects_project_users_project_id_user_id_1f1188c9_uniq" {
    columns = [column.project_id, column.user_id]
  }
}

schema "public" {
  comment = "standard public schema"
}
