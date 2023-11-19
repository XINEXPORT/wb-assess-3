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



////////////////// ROUTES ///////////////////

//////USE SESSION UPON ENTERING THE SITE/////
////SESSION WILL STORE THE NAME
app.get('/', (req, res) => {
  const name = req.session.name;

  if (name) {
    res.redirect('/top-fossil')
  } else {
    res.render('homepage.html.njk')
  }
})

/////USING SESSIONS TO REMEMBER TOP FOSSILS PAGE LOAD/////
////THIS OCCURS WHEN A USER HAS PROVIDED THEIR NAME
app.get('/top-fossils', (req, res) => {
  const name = req.session.name
  if (name) {
    res.render("top-fossils.html.njk", { fossils: Object.values(MOST_LIKED_FOSSILS), name });
  } else {
    res.redirect('/')
  }
});


//////////GETTING THE NAME OF USER////////
////IF THE NAME OF THE USER IS IN THE SESSION, REDIRECT TO TOP-FOSSILS

app.post('/get-name', (req, res) => {
  const name = req.body.name;
  console.log(name);
  req.session.name = name;
  res.redirect('/top-fossils');
});

///////LOADING A RANDOM FOSSIL FROM JSON FILE/////
app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});



////UPON SELECTING A FOSSIL, IF THE SELECTED FOSSIL IS IN MOST_LIKED_FOSSILS OBJECT///
///INCREASE THE MOST_LIKED_FOSSILS NUM LIKES BY +1
///THEN RENDER THE THANK-YOU PAGE UPON LIKING A FOSSIL

app.post('/like-fossil', (req, res) => {
  const name = req.session.name;
  console.log(req.body);
  const fossilSelect = req.body.fossilSelect
  console.log(req.body.fossilSelect);

if (MOST_LIKED_FOSSILS[fossilSelect]) {
  MOST_LIKED_FOSSILS[fossilSelect].num_likes =+1;
}
  res.render('thank-you.html.njk', {name});
});



////LOGOUT LINK WAS CREATED TO DESTROY SESSON///
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
  res.render('homepage.html.njk');
});
});



/////////////Rank Page is the Cart/////////////////

// app.get('/rank', (req, res) => {
//   const name = req.session.name
//   if (name) {
//     res.render("rank.html.njk", { fossils: Object.values(MOST_LIKED_FOSSILS), name });
//   } else {
//     res.redirect('/')
//   }
// });

// app.get('/top-fossils/:fossilId', (req, res) => {
//   let {fossilId} = req.params
//   res.render('/rank', { fossil: fossilDetails(fossilId) });
// });

// app.get('/top-fossils/:fossilId', (req, res) => {
//   const {fossilId} = req.params
//   const sess = req.session;

//   console.log(sess);

//     if (!sess.rank) {
//       sess.rank = {};
//     }

//     if (!sess.rank[fosilId]) {
//       sess.rank[fossilID] = 0;
//     }

//     sess.rank[fossilId]++;
//     console.log (sess.rank[fossilID]);
//     res.redirect('/rank');
// });

// app.get('/rank', (req, res) => {
//   let sess = req.session;

//   if (!sess.rank) {
//     sess.rank = {};
//   }
//   console.log (sess);
//   console.log ("/rank hit");
//     let rank = sess.rank;
//     console.log(rank);
//     let arrRank = [];
//     let rankTotal = 0;

//     for (let fossilSelect in rank) {
//       console.log(rank, "hi");
//       const qty = sess.rank[fossilSelect];
//       console.log(fossilSelect);

//       let fossilDetails = getFossilDetails(fossilSelect);
//       rankTotal += qty * fossilDetails.num_likes;
//       fossilDetails.num_likes = qty;
//       arrRank.push(fossilDetails);

//       console.log(qty);
//       console.log(fossilDetails);
//     }

//     res.render('rank.html.njk', { arrRank, rankTotal });
//   });




ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});
