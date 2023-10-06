1. Signup  - {user_id, firstname,lastname,username,email or mobileno, password_hash,password_salt,gender,dob, created_date,updated_date}
2. login - {id, user_id, username,created_date,updated_id}
3.logout - {id,user_id ,lastlogged_In,created_date,updated_date}
3. Posts - { post_id, user_id, post_caption, post_images_urls,post_videos, like, comment, created_date,updated_id}
# create post
# delete post 
# get all post 
4. comment - {comment_id, post_id, post_userId, comment_content,commented_by,created_date,updated_date}
"login": {
        "user_id": "uuid",
        "username": "string",
        "password":"string",
        "created_date": "date",
        "updated_date": "date"
    },
    "logout": {
        "user_id": "uuid",
        "lastlogged_In": "date",
        "created_date": "date",
        "updated_date": "date"
    },
    "delete_post": {
        "post_id": "uuid",
        "user_id": "uuid",
        "created_date": "date",
        "updated_date": "date"
    },
    "get_post": {
        "post": {
            "array"
        }
    },

    aws setup

    npm install @aws-sdk/client-s3
    npm install @aws-sdk/s3-request-presigner