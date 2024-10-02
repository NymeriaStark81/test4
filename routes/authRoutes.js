const authController = require('../controllers/authController')
const authCreateTemplate = require('../controllers/authCreateTemplate')
const authCreateJournal = require('../controllers/authCreateJournal')
const authCreateHabit = require('../controllers/authCreateHabit')

const router = require('express').Router()

router.post('/login', authController.user_login)
router.post('/loadTemplate', authCreateTemplate.load_template)
router.post('/createTemplate', authCreateTemplate.create_template)
router.post('/initialization', authCreateTemplate.initialize)
router.post('/updateCanvas', authCreateTemplate.update_canvas)
router.post('/requestBuffer', authCreateTemplate.request_buffer)
router.post('/createHabit', authCreateHabit.create_habit)
router.post('/updateHabit', authCreateHabit.update_habit)
router.post('/loadHabit', authCreateHabit.load_habit)
router.post('/loadHabitLists', authCreateHabit.load_habit_lists)
router.post('/createJournal', authCreateJournal.create_journal)

module.exports = router