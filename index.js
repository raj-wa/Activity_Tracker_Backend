const express = require('express')
const cors = require('cors');
const UserController = require('./controller/user/user.controller')
const ActivityController = require('./controller/activity/activity.controller')
const app = express()
require('./db/index')


app.use(cors());
app.use(express.json())
// app.use(express.urlencoded({
//     extended: false
// }))


// User Routes
app.post('/user/create',UserController.createUser)
app.get('/user',UserController.getUsers)


// Activity Routes
app.post('/activity/create',ActivityController.createActivity)
app.put('/activity/update',ActivityController.updateActivityById)
app.post('/activity',ActivityController.getActivitiesByUserId)
app.delete('/activity',ActivityController.deleteActivitiesByUserId)


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('service run on port::::: ',port);
})