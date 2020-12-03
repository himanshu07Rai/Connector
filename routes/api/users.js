// const express = require('express');
// const router = express.Router();
// const {check, validationResult} = require('express-validator')
// const User = require('../../Modles/User');
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');

// //@route     POST api/users
// //@desc      Register User
// //@access    Public

// router.post('/',[
//     check('name','Name is Required').not().isEmpty(),
//     check('email','Please Enter a Valid Email').isEmail(),
//     check('password','Please enter a password with 6 or more characters').isLength({min:6})
// ],
// async(req,res)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors : errors.array()});
//     }
//     const {name, email, password} = req.body;
//     try{
//         let user = await User.findOne({emai});
//         if(user){
//             res.status(400).json({ errors:{ msg: "Thsi user already exits! "} });
//         }

//         const avatar = gravatar.url(email,{
//             s:'200',
//             r:'pg',
//             d:'mm'
//         })

//         user = new User({
//             name,
//             email,
//             avatar,
//             password
//         })

//         const salt = await bcrypt.genSalt(10);

//         user.password = await bcrypt.hash(password,salt);

//         await user.save();

//         res.send('User Registered');
//     }catch(err){
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
    
    
// })

// module.exports = router;

const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const User = require('../../Modles/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


// const User = require('../../Models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;