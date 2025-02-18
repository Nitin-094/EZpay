const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET }  = require("../config");
const bcrypt = require("bcrypt");
const  { authMiddleware } = require("../middleware");
// signup and signin routes

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})
router.post("/signup", async (req, res) => { 
    const body = req.body;
    console.log(body);
    const obj = signupSchema.safeParse(req.body);
    if (!obj.success) {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = User.findOne({
        username: body.username
    })

    if (user._id) {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const hashedpassword = await bcrypt.hash(body.password,10)

    const dbUser = await User.create({
        username: body.username,
        password: hashedpassword,
        firstName: body.firstName,
        lastName: body.lastName,
    });

    /// ----- Create new account ------

    await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random() * 10000
    })

		/// -----  ------


    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })

})

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

router.post("/signin", async (req,res)=>{
    const body = req.body;

    const {success} = signinSchema.safeParse(body);
    if(!success){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username
    });


    if (!user) {
        return res.status(404).send("User not found.");
    }
    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (passwordMatch) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            message:"Successfully logged In",
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })

})

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

router.get('/me', authMiddleware,async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('username firstName lastName');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

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

module.exports = router;