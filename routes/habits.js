const express=require('express');
const router=express.Router();
const passport=require('passport');


const habitController=require('../controllers/habit_controller');

router.post('/habit-name',passport.checkAuthentication,habitController.createHabit);

router.get('/delete-habit/:id',passport.checkAuthentication,habitController.deleteHabit);

router.post('/update-habit-daily/:id',passport.checkAuthentication,habitController.updateStatusDaily);

router.post('/update-habit-weekly/:id',passport.checkAuthentication,habitController.updateStatusWeekly)

module.exports=router;
