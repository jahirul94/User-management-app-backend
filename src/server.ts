import mongoose from 'mongoose';
import app from './app';

const port = 5000;

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://user-management:user-management-app-pass@cluster0.kri1sc7.mongodb.net/advance-express-app?retryWrites=true&w=majority',
    );

    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
