const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const flashMiddleware = require('./app/middlewares/flash')
const guestMiddleware = require('./app/middlewares/guest')

const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')

routes.use('*', flashMiddleware)

// All get files
routes.get('/files/:file', FileController.show)

// Auth
routes.get('/', guestMiddleware, SessionController.create)
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signin', SessionController.store)
routes.post('/signup', upload.single('avatar'), UserController.store)

// Dashboard
routes.use('/app', authMiddleware)

routes.get('/app/appointments/new/:provider', AppointmentController.new)
routes.get('/app/available/:provider', AvailableController.index)
routes.get('/app/dashboard', DashboardController.index)
routes.get('/app/logout', SessionController.destroy)
routes.post('/app/appointments/create/:provider', AppointmentController.store)

module.exports = routes
