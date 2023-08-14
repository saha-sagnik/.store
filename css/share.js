
module.exports = mongoose.model("User", userSchema)

async function connectToMongoDB() {
    try {
      await mongoose.connect('mongodb+srv://sbmunnu:munnu@mongo.mzaad3h.mongodb.net/wallmart?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
connectToMongoDB();

async function addToShared(name, info) {
    try {
        // Find the user by their name
        const user = await User.findOne({ name });

        if (!user) {
            console.log(`User with name ${name} not found.`);
            return;
        }

        // Add the info to the shared array
        user.shared.push(info);

        // Save the updated user
        await user.save();

        console.log(`Info added to the shared array for user ${name}`);
    } catch (error) {
        console.error('Error adding info to shared array:', error);
    }
}

addToShared('ajay', '/product')