const express=require('express');
const router=express.Router();
const passport=require('passport');


const userController=require('../controllers/user_controller');

router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

router.post('/create',userController.createUser);

router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),userController.createSession);

router.get('/daily-habit',passport.checkAuthentication,userController.dailyHabit);

router.get('/weekly-tracker/:id',passport.checkAuthentication,userController.weeklyTracker);

router.get('/sign-out',userController.destroySession);

module.exports=router;