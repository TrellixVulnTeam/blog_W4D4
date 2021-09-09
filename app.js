const express        = require('express');
const mongoose       = require('mongoose');
const Article        = require('./models/article');
const path           = require('path');
const { resourceUsage } = require('process');
const articleRouter  = require('./routes/articles');
const methodOverride = require('method-override');
const app            = express();

mongoose.connect('mongodb://localhost/blog', { 
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log( 'Database Connected' )
}).catch(err => {
  console.log( err )
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
});

app.use('/articles', articleRouter);

app.listen(5000);