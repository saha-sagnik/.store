
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

function display(){
    const container = document.getElementById('link-container');

// Create a new anchor element
const link = document.createElement('a');

// Set the href attribute and inner text of the link
link.href = '/product';
link.innerText = 'Visit Example';

// Append the link to the container element
container.appendChild(link);

}
display()