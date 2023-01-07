const express = require('express')
const router = express.Router();
const { insertCustomer, getCustomerByEmail, getCustomerById, storeUserRefreshJWT, verifyUser, updateCustomerDetails } = require("../modal/customer/Customer.model")
const { hashPassword, comparePassword } = require("../helpers/bycrypt.helper")
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helper")
const { userAuthorization } = require("../middlewares/authorization.middleware")
// const { setPasswordResetPin } = require("../model/resetPin/ResetPin.model")
const { deleteJWT } = require("../helpers/redis.helper")

router.all('/', (req, res, next) => {
    next()
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ status: "error", message: "No Valid credentials" })
    }
    const user = await getCustomerByEmail(email)

    // if (!user.isVerified) {
    // 	return res.json({
    // 		status: "error",
    // 		message:
    // 			"You account has not been verified. Please check your email and verify you account before able to login!",
    // 	});
    // }


    if (!user) {
        return res.json({ status: "error", message: "Invalid Email" })
    }

    const passFromDb = user && user.id ? user.password : null

    if (!passFromDb) {
        return res.json({ status: "error", message: "Invalid email or password" })
    }

    const result = await comparePassword(password, passFromDb);
    console.log(result)
    if (!result) {
        return res.json({ status: "error", message: "Invalid email or password" })
    }
    console.log(typeof user._id)
    const accessJWT = await createAccessJWT(user.email, `${user._id}`)

    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`)

    res.json({ status: "success", message: "Login success", accessJWT, refreshJWT })
})

// router.get("/auth/me", (req, res) => {
//     console.log("get me")
//     try { 

//     }
// })
// Get customer profile routers
router.get("/", userAuthorization, async (req, res) => {
    //this data coming from database

    const _id = req.userId

    const userProf = await getCustomerById(_id)
    const { isAdmin, isCustomer, name, email, address, phone, suburb, postcode } = userProf;
    console.log(userProf)
    res.json({
        user: {

            // name,
            // email,
            // isAdmin,
            // isCustomer,
            // address,
            // phone,
            // suburb,
            // postcode
            ...userProf

        },
    });
});



// User Sign up with Email and Password
router.post('/', async (req, res) => {
    const { firstName, lastName, phone, email, password, isCustomer, isAdmin } = req.body
    try {
        //hash password
        const hashPass = await hashPassword(password)
        const newUserObj = {
            firstName,
            lastName,
            phone,
            email,
            password: hashPass,
            isCustomer,
            isAdmin
        }


        const result = await insertCustomer(newUserObj)
        console.log(result)
        res.json({ message: "New user created", result })
    } catch (error) {
        console.log(error);
        res.json({ status: "error", message: error.message })
    }




})

//verify user after user is sign up and
// router.patch("/verify", async (req, res) => {
// 	try {
// 		const { _id, email } = req.body;
// 		console.log(_id, email);

// 		const result = await verifyUser(_id, email);

// 		if (result && result.id) {
// 			return res.json({
// 				status: "success",
// 				message: "You account has been activated, you may sign in now.",
// 			});
// 		}

// 		return res.json({
// 			status: "error",
// 			message: "Invalid request!",
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		return res.json({
// 			status: "error",
// 			message: "Invalid request!",
// 		});
// 	}
// });

// //user sign in router
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) {
//         return res.json({ status: "error", message: "No Valid credentials" })
//     }
//     const user = await getUserByEmail(email)

//     // if (!user.isVerified) {
// 	// 	return res.json({
// 	// 		status: "error",
// 	// 		message:
// 	// 			"You account has not been verified. Please check your email and verify you account before able to login!",
// 	// 	});
// 	// }




//     const passFromDb = user && user.id ? user.password : null

//     if (!passFromDb) {
//         return res.json({ status: "error", message: "Invalid email or password" })
//     }

//     const result = await comparePassword(password, passFromDb);
//     console.log(result)
//     if (!result) {
//         return res.json({ status: "error", message: "Invalid email or password" })
//     }
//     console.log(typeof user._id)
//     const accessJWT = await createAccessJWT(user.email, `${user._id}`)

//     const refreshJWT = await createRefreshJWT(user.email, `${user._id}`)

//     res.json({ status: "success", message: "Login success", accessJWT, refreshJWT })
// })

// //email the pin

// //reset password and refresh
// router.post("/reset-password", async (req, res) => {
//     const { email } = req.body

//     const user = await getUserByEmail(email)

//     if (user && user._id) {
//         const setPin = await setPasswordResetPin(email, user)
//         return res.json(setPin)

//     }

//     res.json({ status: "error", message: "If the email exist in our databse, the password reset pin will be sent shortly" })
// })

// //User logout and invalidate jwts

router.delete("/logout", userAuthorization, async (req, res) => {
    const { authorization } = req.headers
    //this data coming from database

    const _id = req.userId

    //delete accessJWT from redis database

    deleteJWT(authorization);
    //delete freshjwt from mongodb
    const result = await storeUserRefreshJWT(_id, '')

    if (result._id) {
        return res.json({ status: "success", message: "Logged out successfully" });
    }

    res.json({
        status: "error",
        message: "Unable to logg you out, plz try again later",
    });
})


router.put("/:_id", async (req, res) => {
    console.log('heri', req.body)
    try {
        // const { name, email, street, suburb, postcode, state, address, mobile } = req.body
        const { _id } = req.params;
        console.log(_id)
        const lama = req.body
        // const updatedBookingObj = {
        //     clientId: _id,
        //     name,
        //     email,
        //     street,
        //     suburb,
        //     postcode,
        //     state,
        //     address,
        //     mobile
        // }


        const result = await updateCustomerDetails(lama, _id);
        // console.log('milan', result)

        if (result._id) {
            return res.json({
                status: "success",
                message: "User updated",
               
            });
        }
        res.status(300).json({ status: "error", message: "Unable to update your message please try again later" })

    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});



module.exports = router