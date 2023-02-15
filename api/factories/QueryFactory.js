export default {
  setDatabaseType: function (dbType) {
    this["dbType"] = dbType;
  },
  get: function (route, dbType) {
    return this[`${route}_${this.dbType}`];
  },
  // auth
  selectUserByUsername_mysql: "SELECT * FROM users WHERE username = ?",
  selectUserByUsername_yugabyte: "SELECT * FROM users WHERE username = $1",
  insertUser_mysql:
    "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?)",
  insertUser_yugabyte:
    "INSERT INTO users (username, email, password, name) VALUES ($1,$2,$3,$4)",

  // comments
  commentsForPost_mysql: `SELECT c.*, u.id AS userid, name, profilepic FROM comments AS c JOIN users AS u ON (u.id = c.userid)
  WHERE c.postid = ? ORDER BY c.createdat ASC`,
  commentsForPost_yugabyte:
    "SELECT c.*, u.id AS userid, name, profilepic FROM comments AS c JOIN users AS u ON (u.id = c.userid) WHERE c.postid = $1 ORDER BY c.createdat ASC",
  addComment_mysql:
    "INSERT INTO comments(`description`, `createdat`, `userid`, `postid`) VALUES (?)",
  addComment_yugabyte:
    "INSERT INTO comments(description, createdat, userid, postid) VALUES ($1,$2,$3,$4)",
  deleteComment_mysql: "DELETE FROM comments WHERE `id` = ? AND `userid` = ?",
  deleteComment_yugabyte: "DELETE FROM comments WHERE id = $1 AND userid = $2",

  // likes
  likesForPost_mysql: "SELECT userid FROM likes WHERE postid = ?",
  likesForPost_yugabyte: "SELECT userid FROM likes WHERE postid = $1",
  addLikeToPost_mysql: "INSERT INTO likes (`userid`,`postid`) VALUES (?)",
  addLikeToPost_yugabyte: "INSERT INTO likes (userid,postid) VALUES ($1, $2)",
  deleteLikeForPost_mysql:
    "DELETE FROM likes WHERE `userid` = ? AND `postid` = ?",
  deleteLikeForPost_yugabyte:
    "DELETE FROM likes WHERE userid = $1 AND postid = $2",

  // posts
  getPostsForUser_mysql: `SELECT p.*, u.id AS userid, name, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid) WHERE p.userid = ? ORDER BY p.createdat DESC`,
  getPostsForUser_yugabyte: `SELECT p.*, u.id AS userid, name, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid) WHERE p.userid = $1 ORDER BY p.createdat DESC`,
  getPostsForUserAndFollowedUsers_mysql: `SELECT p.*, u.id AS userid, name, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid)
    LEFT JOIN relationships AS r ON (p.userid = r.followeduserid) WHERE r.followeruserid= ? OR p.userid =?
    ORDER BY p.createdat DESC`,
  getPostsForUserAndFollowedUsers_yugabyte: `SELECT p.*, u.id AS userid, name, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userid)
    LEFT JOIN relationships AS r ON (p.userid = r.followeduserid) WHERE r.followeruserid= $1 OR p.userid = $2
    ORDER BY p.createdat DESC`,
  addPost_mysql:
    "INSERT INTO posts(`description`, `img`, `createdat`, `userid`) VALUES (?)",
  addPost_yugabyte:
    'INSERT INTO posts ("description", img, createdat, userid) VALUES ($1, $2, $3, $4)',
  deletePost_mysql: "DELETE FROM posts WHERE `id`=? AND `userid` = ?",
  deletePost_yugabyte: "DELETE FROM posts WHERE id = $1 AND userid = $2",

  // relationships
  getRelationshipsFromFollowedUser_mysql:
    "SELECT followeruserid FROM relationships WHERE followeduserid = ?",
  getRelationshipsFromFollowedUser_yugabyte:
    "SELECT followeruserid FROM relationships WHERE followeduserid = $1",
  getRelationshipsFromFollowerUser_mysql:
    "SELECT followeduserid FROM relationships WHERE followeruserid = ?",
  getRelationshipsFromFollowerUser_yugabyte:
    "SELECT followeduserid FROM relationships WHERE followeruserid = $1",
  getFollowing_mysql:
    "SELECT followeduserid FROM relationships WHERE followeruserid = ?",
  getFollowing_yugabyte:
    "SELECT followeduserid FROM relationships WHERE followeruserid = $1",
  addRelationship_mysql:
    "INSERT INTO relationships (`followeruserid`,`followeduserid`) VALUES (?)",
  addRelationship_yugabyte:
    "INSERT INTO relationships (followeruserid,followeduserid) VALUES ($1, $2)",
  deleteRelationship_mysql:
    "DELETE FROM relationships WHERE `followeruserid` = ? AND `followeduserid` = ?",
  deleteRelationship_yugabyte:
    "DELETE FROM relationships WHERE followeruserid = $1 AND followeduserid = $2",

  //users
  getUsers_mysql: "SELECT * FROM users WHERE id != ? ORDER BY id ASC LIMIT 5",
  getUsers_yugabyte:
    "SELECT * FROM users WHERE id != $1 ORDER BY id ASC LIMIT 5",
  getUserById_mysql: "SELECT * FROM users WHERE id=?",
  getUserById_yugabyte: "SELECT * FROM users WHERE id = $1",
  updateUser_mysql:
    "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilepic`=?,`coverpic`=? WHERE id=?",
  updateUser_yugabyte:
    "UPDATE users SET name = $1,city = $2, website = $3, profilepic = $4, coverpic = $5 WHERE id = $6",
};
