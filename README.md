# members-only

Members Only is a full-stack web application where users can create and view messages. Anyone can see the messages, but only members can see the author's identity and post date. Administrators have additional permissions such as deleting messages.

This project focuses on authentication, authorization, and role-based access control.

Features:
User authentication with login and signup,
Password hashing using bcrypt,
Session based authentication,
Role based permissions,

Three different user roles:
Guest (not logged in),
Member,
Admin,

Guests can view messages but cannot see authors.

Members can:
create messages,
see message authors and timestamps,

Admins can:
see everything,
delete messages,

Technologies Used:

Backend:
Node.js,
Express.js

Database:
PostgreSQL,

Authentication:
Passport.js,
bcrypt,

Frontend:
EJS templates,
CSS animations,


Project structure:

members-only
│
├── app.js
│
├── config
│   └── passport.js
│
├── controllers
│   ├── authController.js
│   └── messageController.js
│
├── models
│   ├── userModel.js
│   └── messageModel.js
│
├── routes
│   ├── authRoutes.js
│   └── messageRoutes.js
│
├── middleware
│   └── authMiddleware.js
│
├── views
│   ├── index.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── join-club.ejs
│   └── new-message.ejs
│
└── public
    └── styles.css