const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('conneted to bd'))
    .catch(err => {
        console.log(err)
    })