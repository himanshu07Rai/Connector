const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth');

const User = require('../../Modles/User')

//@route     GET api/auth
//@desc      Test route
//@access    Public

router.get('/',auth,async(req,res)=>{

    try{

        const user = await User.findById(req.user.id).select('-password');  //Everythig w/o password
        res.json(user);

    }catch(err){
        
        console.error(err.message);
        res.status(500).send('Server Error');

    }
    res.send('auth route')
})

module.exports = router;