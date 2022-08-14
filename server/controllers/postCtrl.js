const asyncLib = require("async");
const { getUserId, getInfosUserFromToken } = require("../jwtUtils");
const models = require("../models");

module.exports = {
  
  addPost: (req, res) => {
  
    const content = req.body.content;
    const token = req.cookies.jwt
    const userId = getUserId(token)
    const image = ( req.file ? req.file.filename : null )

    if(!content && !image) return res.status(400).json({error: 'Publication vide'})

      models.Users.findByPk(userId)
      .then((userId) => {
          models.Posts.create({
            content: content,
            userId: userId.id,
            image: image
          })
            .then((newPost) => {
              res.status(200).json(newPost)
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ error: "An error occurred" });
            });
        })
      .catch((err) => console.log(err))
  },

  getAllPosts: (req, res) => {
    models.Posts.findAll({
      attributes: ["id", "userId", "content", "image", "createdAt", "updatedAt"]
    })
      .then((posts) => {
        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.setHeader('Content-Range', 5);
        res.status(200).json(posts);
      })
      .catch((err) => {
        res.status(400).json({ error: "An error occurred" });
      });
  },

  getOnePost: (req, res) => {
    const postId = req.params.id;

    models.Posts.findOne({
      attributes: ["id", "userId", "content", "image", "createdAt", "updatedAt"],
      where: { id: postId },
    })
      .then((post) => {
        if (post) {
          res.status(201).json(post);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Cannot fetch user" });
      });
  },

  updatePost: (req, res) => {
    //Using token for having data of the actual user without another login
    let postId = req.params.id;
    let content = req.body.newContent;
    const token = req.cookies.jwt;
    const user = getInfosUserFromToken(token)

    asyncLib.waterfall(
      [
        (done) => {
          models.Posts.findByPk(postId)
            .then((post) => {
              done(null, post);
            })
            .catch((err) => {
              return res.status(400).json({ error: "Unable to verify post" });
            });
        },
        (post, done) => {
          if (user.id === post.userId || user.isAdmin === true) {
            post
              .update({
                content: content ? content : post.content,
              })
              .then((post) => {
                done(post);
              })
              .catch((err) => {
                res.status(400).json({ error: "An error occurred" });
              });
          } else {
            res.status(404).json({ error: "An error occurred" });
          }
        },
      ],
      (post) => {
        if (post) {
          res.status(200).json({ success: "Post successfuly modified" })
        } else {
          return res.status(400).json({ error: "An error occurred" });
        }
      }
    );
  },

  deletePost: (req, res) => {

    const token = req.cookies.jwt;
    const user = getInfosUserFromToken(token)
    const postId = req.params.id;

    models.Posts.findByPk(postId)
    .then((post) => {
      if(user.isAdmin === true || user.id === post.userId) {
        models.Posts.destroy({
          where: { 
            id: post.id 
          },
        })
        .then(() => {
            return res.status(200).json({ success: `Post successfuly deleted` });
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json({ error: "An error occurred" });
        });
      }
    })
    .catch((err) => console.log(err));
  },

  deleteComment: (req, res) => {

    const token = req.cookies.jwt;
    const user = getInfosUserFromToken(token)
    const commentId = req.params.id;

    models.Comments.findByPk(commentId)
    .then((comment) => {
      if(user.isAdmin === true || user.id === comment.userId) {
        models.Comments.destroy({
          where: {
            id: comment.id
          }
        })
        .then(() => {
            return res.status(200).json({ success: `Comment successfuly deleted` });
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json({ error: "An error occurred" });
        });
      }
    })
    .catch((err) => console.log(err))
  },


  likePost: (req, res) => {
    const token = req.cookies.jwt
    const userId = getUserId(token)
    const postId = req.params.id;

    models.Likes.findOne({
      where: {
        userId: userId,
        postId: postId
      }
    })
      .then((like) => {
        if (!like) {
          models.Likes.create({
            userId: userId,
            postId: postId
          })
            .then((like) => {
                res.status(201).json(like);
            })
            .catch((err) => {
              console.log(err)
              res.status(500).json({ error: "Cannot like post" });
            });
        } else {
          models.Likes.destroy({
            where: { userId: userId, postId: postId },
          })
            .then((like) => {
                res.status(201).json({
                  like,
                  "msg":`like success deleted`
                });

            })
            .catch((err) => {
              res.status(500).json({ error: "Cannot delete like" });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Cannot fetch like" });
      });
  },

  allLikes: (req, res) => {

    models.Likes.findAll({
      attributes: ["id", "userId", "postId"]
    })
      .then((likes) => {
        res.status(200).json(likes);
      })
      .catch((err) => {
        res.status(400).json({ error: "An error occurred" });
      });
  },

  likesByPost: (req, res) => {
    const postId = req.params.id
    
    models.Likes.findAll({
      where: {
        postId: postId
      }
    })
      .then((likes) => {
        res.status(200).json(likes);
      })
      .catch((err) => {
        res.status(400).json({ error: "An error occurred" });
      });
  },

  addComments: (req, res) => {
    //let headerAuth = req.headers["authorization"];
    const token = req.cookies.jwt
    const userId = getUserId(token)
    let postId = req.params.id;
    let commentContent = req.body.commentContent;

    models.Comments.create({
        content: commentContent,
        userId: userId,
        postId: postId
    })
    .then((comment) => {
      return res.status(200).json(comment)  
    })
    .catch((err) => {
        console.log(err)
        return res.status(400).json({ error: "Cannot comment" })
    })
  },

  getComments: (req, res) => {

//    const postId = req.params.postId

    models.Comments.findAll({
      attributes: ["id", "userId", "postId", "content", "createdAt", "updatedAt"]
    })
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch((err) => {
        res.status(400).json({ error: "An error occurred" });
      });
  },

  deleteComment: (req, res) => {

    const token = req.cookies.jwt;
    const user = getInfosUserFromToken(token)
    console.log(user);
    const commentId = req.params.id;

    models.Comments.findByPk(commentId)
    .then((comment) => {
      if(user.isAdmin === true || user.id === comment.userId) {
        models.Comments.destroy({
          where: {
            id: comment.id
          }
        })
        .then(() => {
            return res.status(200).json({ success: `Comment successfuly deleted` });
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json({ error: "An error occurred" });
        });
      }
    })
    .catch((err) => console.log(err))
  },

  updateComment: (req, res) => {
    //Using token for having data of the actual user without another login
    let commentId = req.params.id;
    let content = req.body.newCommentContent;
    const token = req.cookies.jwt;
    const user = getInfosUserFromToken(token)

    asyncLib.waterfall(
      [
        (done) => {
          models.Comments.findByPk(commentId)
            .then((comment) => {
              done(null, comment);
            })
            .catch((err) => {
              return res.status(400).json({ error: "Unable to verify post" });
            });
        },
        (comment, done) => {
          if (comment && user.id === comment.userId || user.isAdmin === true) {
            comment
              .update({
                content: content ? content : comment.content,
              })
              .then((comment) => {
                done(comment);
              })
              .catch((err) => {
                res.status(400).json({ error: "An error occurred" });
              });
          } else {
            res.status(404).json({ error: "An error occurred" });
          }
        },
      ],
      (comment) => {
        //Hanfling errors
        if (comment) {
          res.status(200).json({ success: "Comment successfuly modified" });
        } else {
          return res.status(400).json({ error: "An error occurred" });
        }
      }
    );
  }
}