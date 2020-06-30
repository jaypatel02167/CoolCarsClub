const mongoose = require('mongoose');

//connects to MongoDB
const mongoDB = async () => {
  mongoose.set('useFindAndModify', false);
  try {
    // eslint-disable-next-line no-unused-vars
    const conn = await mongoose.connect(
      'mongodb+srv://jpate118:Ja7pat3l@itis-5166-fklob.mongodb.net/CCC?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    );
    // eslint-disable-next-line no-console
    console.log('Connected');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

module.exports = mongoDB;
