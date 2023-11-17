console.log('Hello World');
import axios from "axios";

async function randomFossil(evt){
  const getRandFossil = document.querySelector('#get-random-fossil');
  let img;
  const response = await axios.get(`/random-fossil.json?q=${img}`);
  img = response.data;
  document.querySelector('#random-fossil-image').innerHTML = `<img src = ${img}>`;
}

document.querySelector('#get-random-fossil').addEventListener('click', randomFossil);

