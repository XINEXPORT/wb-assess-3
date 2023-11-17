import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';
import axios from 'axios';

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

const DEFAULT_FOSSIL = 'Broncosaurus';

//FUNCTIONS//

//Add like to empty object//
// let {name} = req.params
// let sess = req.session;

// console.log (sess);

// if(!sess.like){
//   sess.like = {};
// }

// if(!sess.like[name]){
//   sess.like[name] = 0;
// }
// sess.like[name]++;
// console.log(sess.like[name]);
// res.redirect('/top-fossils');
// });

//   TODO: Display the likes in top-fossils.

// app.get('/top-fossils', (req,res)=>
// let sess = req.session;

// if(!sess.like){
//   sess.like = {};
// }
// console.log(sess);
// console.log("/like hit");

// let like = sess.like;
// console.log(like);
// let arrLikes = [];
// let arrTotal = 0;

// for (let name in like){
//   const qty = sess.like[name]
//   console.log(name);
// }

// )



app.get('/OTHER_FOSSILS.png', (req, res) => {
  const img = req.query["q"];
  console.log(img);
  const fossilIMG = OTHER_FOSSILS[img]
  console.log(fossilIMG);
   if (fossilIMG){
    res.send(fossilIMG.name);
   }
  else{
    res.send(DEFAULT_FOSSIL);
  }
  })


  //Top-Fossils//



  // document.querySelector('#fossil-submit-btn').addEventListener('click', topFossils);

  //Username//

  app.post('/', (req, res) => {
    for(let user of users){
      if (req.body.username === user.username){
        console.log(req.body.username);
        res.redirect('/top-fossils');
        return;
      }
    }
    res.render('/', { message: 'You forgot to share your name!' });
  });


// ROUTES //

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

app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});


// app.get('/top-fossils', (req, res) => {
//   const topFossils = MOST_LIKED_FOSSILS
//   res.render('top-fossils.html.njk');
// });

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});
