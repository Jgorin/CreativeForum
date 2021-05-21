const Model = require("./Model")

class Post extends Model {
  static get tableName(){
    return "posts"
  }

  static get relationMappings(){
    const User = require("./User")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Post