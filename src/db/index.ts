import colors from 'colors/safe';
import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/alexp';

mongoose
  .connect(mongoURI)
  .catch((error: Error) => {
    const separator = '────────────────────────────────────────────────────────';
    console.log('\n' + colors.yellow(separator));
    console.log(colors.red('CONNECTION ERROR'));
    console.log(colors.yellow(separator));
    console.log(`${colors.green('Error name:')} ${error.name}`);
    console.log(`${colors.green('Error message:')} ${error.message}`);
    console.log(separator);
    console.log(`${colors.green('Error stack:')} ${error.stack}`);
    console.log(colors.yellow(separator));
  });

const MongoDB = mongoose.connection;

export default MongoDB;
