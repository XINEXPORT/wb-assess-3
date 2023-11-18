import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];



////// ROUTES //////////////////////
app.get('/', (req, res) => {
  if (req.session.name) {
    res.render('/top-fossils.html.njk')
  } else {
    res.render('homepage.html.njk')
  }
})

app.get('/top-fossils', (req, res) => {
  res.render('top-fossils.html.njk');
});

app.get('/thank-you', (req, res) => {
  res.render('thank-you.html.njk');
});

app.get('/rank', (req, res) => {
  res.render('rank.html.njk');
 })

app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
  res.render('homepage.html.njk');
});
});

app.post('/like-fossil', (req, res) => {

const {fossil} = req.body
req.session.fossile = fossil
for(const key in MOST_LIKED_FOSSILS){
  if(key ===fossil){
    MOST_LIKED_FOSSILS[fossil].num_likes++
  }
}
res.render ('thank-you.html.njk', {name: req.session.name})
})


////////////Top Fossils is like Add to Cart///////////////

app.get('/top-fossils', (req, res) =>{
  if (req.session.name) {
    res.render('top-fossils.html.njk', {
      mostLiked: Object.values(MOST_LIKED_FOSSILS), name: req.session.name
    });
  } else {
    res.redirect('top-fossils.html.njk');
  };
});



/////////////Rank Page is the Cart/////////////////
// app.get('/rank', (req,res)=>{
// const sess = req.session;

// if(!sess.rank){
//   sess.rank = {};
// }
// console.log("/rank hit");

// let rank = sess.rank;
// console.log(rank);
// let arrRank = [];
// let rankTotal = 0;

// for (let fossilID in rank){
//   const qty = sess.rank[fossilID];
//   console.log(fossilID);

//   let fossilDetails = getFossilDetails(fossilID);
//   rankTotal += qty * fossilDetails.num_likes;
//   fossilDetails.num_likes = qty;
//   arrRank.push(fossilDetails);

//   console.log(qty);
//   console.log(fossilDetails);
// }
// res.render('rank.html.njk', {arrRank, rankTotal});
// });


  /////////////////////Username//////////////////////////

  app.post('/get-name', (req, res) => {
    const { name } = req.body
      req.session.name = name
      res.redirect('/top-fossils')
  })

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});
