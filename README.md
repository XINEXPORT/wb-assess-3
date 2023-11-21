# wb-assess-3
WebAssesment3,DevMountain, Dallas,2023

# Score: 91 out of 100

Feedback below:
!!!! ->  const fossilSelect = req.body.fossilSelect   // you accidentally used fossilSelect on req.body instead of likedFossil. ie the body is sending the key of likedFossil but you accidentally used fossilSelect as the key.

!!! These console.logs show an issue in how you were trying to access the num_likes key/value.
  console.log(req.body.likedFossil);       //the option selected gives the name from the sub-object, ie "australopithecus"
  
console.log(MOST_LIKED_FOSSILS)    // this is an object made up of objects. Therefore, you have a key that will allow you to access a specific fossil object, and then it's keys. ie "aust" will let you access the name and num_likes:
{ 
aust: {name: "australopithecus", num_likes: 584}, 
quetz: {}, 
steg: {} 
}
  
console.log(MOST_LIKED_FOSSILS[fossilSelect])     //This is undefined because "australopithecus" is not a key on the MOST_LIKED_FOSSILS object. It needed to be "aust" in that example. Trying to use this below isn't actually accessing the num_likes property to update the value. You can change this in your form, in the html file. You can put the fossil name for what is selected, but you should add the value property to the <option> and set it tot eh key you wantto use. ie  <option value="aust">Australopithecus</option>

if (MOST_LIKED_FOSSILS[fossilSelect]) {
  MOST_LIKED_FOSSILS[fossilSelect].num_likes =+1;    // This is really close. it needs to be += instead of =+
}
  res.render('thank-you.html.njk', {name});
});

The logic behind this route is great! The issue was one of making sure you were accessing the right pieces of data to use and some smaller misuse of syntax/references.

On the random fossil display, it is missing displaying the name in addition to the image. Again, everything you did in your code was correct, it was simply missing that last piece to complete what was asked in the assessment.

## Corrections pushed on 11/21/23
