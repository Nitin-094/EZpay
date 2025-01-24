import express from 'express';
import zod from 'zod';
import jwt from "jsonwebtoken";
import { User } from "../db/db.js";
import JWT_SECRET  from "../config.js";
import { authMiddleware } from '../middleware.js';

// backend/routes/user.js

const router = express.Router();

// sign-up route ----------------------------------------------------------------------
const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

// sign-in route----------------------------------------------------------------------
router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

// update user info route ----------------------------------------------------------------------

// Method: PUT
// Route: /api/v1/user

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})
// search route ----------------------------------------------------------------------
/*
Method: GET
Route: /api/v1/user/bulk
Query Parameter: ?filter=harkirat
 */

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

export{router as userRouter};


/*
1. Imports and Setup
Express Router: Creates a new router object to define routes for user-related operations.
Zod: Used for request body validation (ensuring data correctness).
User Model: Represents the user data stored in the database (likely MongoDB).
JWT: Used to create a JSON Web Token for authentication.
JWT_SECRET: A secret key (stored in config) for signing JWT tokens.

2. Signup Route (POST /signup)
Handles user registration.

Key Steps:
Input Validation:

The signupBody schema ensures the username is a valid email, and firstName, lastName, and password are strings.
safeParse(req.body) validates the incoming request body.
If validation fails, a 411 status code is returned with an error message.
Duplicate Check:

Checks if a user with the same email (username) already exists in the database using User.findOne().
User Creation:

If no duplicates exist, a new user is created with User.create().
Token Generation:

A JWT token is generated for the user using their unique userId.
The token is returned in the response along with a success message.
Issues in this Route:
Status Code 411: This status code is meant for "Length Required." A more appropriate status for validation errors is 400 (Bad Request) or 409 (Conflict) for duplicate users.
Error Message Clarity: "Email already taken / Incorrect inputs" is misleading as it combines two scenarios. Separate messages would be clearer.

3. Signin Route (POST /signin)
Handles user login.

Key Steps:
Input Validation:

The signinBody schema validates the request body (ensuring username is an email and password is a string).
User Authentication:

Finds a user matching the username and password in the database.
Token Generation:

If the user is found, a JWT token is generated using their userId and returned in the response.
Error Handling:

If the user is not found, a 411 status code is returned with an error message.
Issues in this Route:
Storing Plaintext Passwords:
Passwords are stored and matched in plaintext. This is a huge security risk. Use a library like bcrypt to hash passwords before storing them in the database and compare hashed passwords during login.
Misleading Error Codes:
Status 411 is used again here for validation errors or login failure. 401 (Unauthorized) or 400 (Bad Request) would be more appropriate.

4. Key Security and Design Flaws
Password Storage:

Plaintext storage is a critical vulnerability. Always hash passwords with bcrypt or a similar library.
Error Messages:

Combining error messages (e.g., "Email already taken / Incorrect inputs") can confuse users and developers.
Validation Logic:

The validation success check (signupBody.safeParse(req.body)) does not provide feedback on what failed. Use the .error property of safeParse to give detailed error messages.
JWT Expiry:

Tokens do not have an expiration time. Add an expiresIn field when signing JWTs.
HTTP Status Codes:

Replace 411 with 400 (Bad Request), 401 (Unauthorized), or 409 (Conflict) where appropriate.

 */