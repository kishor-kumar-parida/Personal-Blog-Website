//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const favicon = require("serve-favicon");
const path = require("path");

const homeStartingContent = "Welcome to the Home section of our personal blog website! Here, we open the doors to our virtual sanctuary, sharing heartfelt musings, exciting updates, and authentic stories that shape our lives. It's a cozy haven where we connect with kindred spirits like you, fostering meaningful conversations and a sense of belonging. Join us on this enriching expedition through our inner world, as we celebrate the joys and navigate the challenges of life together. So, make yourself at home, grab a metaphorical cup of tea, and let's explore, learn, and grow in this digital refuge of inspiration and connection.";

const aboutContent = "Welcome to our personal blog website! Here, we embark on a captivating journey through the realms of our thoughts, passions, and experiences. Our blog serves as a digital canvas where we paint stories with words, inviting you to immerse yourself in a world of inspiration and connection. With a diverse range of topics, from travel adventures to culinary escapades, introspective reflections, and tips for personal growth, we aim to ignite your curiosity and kindle meaningful conversations. We believe in the power of storytelling to create bonds, bridge cultures, and evoke emotions. Our virtual abode is a safe space where authenticity thrives, and where we can share not only our triumphs but also our vulnerabilities. As fellow travelers in this adventure called life, we encourage you to join us on this exploration, leaving footprints of knowledge, empathy, and shared experiences along the way. Together, let's embrace the beauty of the human experience and celebrate the wonders of the world we inhabit. ";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.use(favicon(path.join(__dirname, 'public','favicon.png')));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get('/', (req, res) => { 
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});


app.get('/about', (req, res) => { 
  res.render("about",{aboutContent: aboutContent});
});


app.get('/contact', (req, res) => { 
  res.render("contact",{contactContent: contactContent});
});


app.get('/compose', (req, res) => { 
  res.render("compose");
});


app.post('/compose', (req, res) => { 
  var a = req.body.postTitle;
  var b = req.body.textBody;

  const post = {
    title: a,
    content: b
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    } 
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});