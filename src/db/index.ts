import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/alexp';

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
    .catch((error: Error) => {
      console.error('Connection error', error.message);
    });

const MongoDB = mongoose.connection;

export default MongoDB;