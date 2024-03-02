module.exports = {
    // mongoURI: 'mongodb+srv://duttji:admin@database1.znkkc6y.mongodb.net/miniprojectDB1',
    mongoURI: 'mongodb://',

    jwtSecret: 'used-for-auth',
  };
  
  mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`, {
});
// MONGO_URI=127.0.0.1
// MONGO_PORT=27017
// MONGO_USERNAME=blog_app
// MONGO_PASSWORD=6a92119306d10150b971933c
// MONGO_DATABASE=blog