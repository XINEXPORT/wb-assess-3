console.log('Hello World');
import axios from "axios";

async function randomFossil(evt){
  const url = `/random-fossil.json`;
  const getRandFossil = document.querySelector('#get-random-fossil');
  const response = await axios.get(url);

  console.log(response);

  const img = response.data.img;

  const name =  response.data.name;
  console.log(img);
  
  document.querySelector('#random-fossil-image').innerHTML = `<img src = ${img}>`;
}

document.querySelector('#get-random-fossil').addEventListener('click', randomFossil);

////////////////////////////////////

async function rankFossil(evt){
  const url = `/random-fossil.json`;
  const getRandFossil = document.querySelector('#rankFossil');
  const response = await axios.get(url);

  console.log(response);

  const img = response.data.img;

  const name =  response.data.name;
  console.log(img);
  
  document.querySelector('#rankFossil').innerHTML = `<img src = ${img}>`;
}

// document.querySelector('#rankFossil').addEventListener('click', randomFossil);

