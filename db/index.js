const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://raj-wa:Webashlar123@cluster0.dlrtp.mongodb.net/Activity_Tracker?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log('err---------', err);
    } else {
        console.log('database successfully connected')
    }
})
