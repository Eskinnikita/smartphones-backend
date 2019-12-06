const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://EskinNikita:52efavil@smartphones-ldyxu.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('conneted to bd'))
    .catch(err => {
        console.log(err)
    })