import './style.css';
import { countAllMovies } from './modules/movieCounter.js';
import movieCard from './modules/movieCard.js';
import commentPopUp from './modules/commentPopUp.js';

const baseMovieURL = 'https://api.tvmaze.com/shows/';
const involvementLikes = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ADIK65sjpCXvzrCJe3B4/likes/';
const involvementComments = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ADIK65sjpCXvzrCJe3B4/comments/';
const movieWrapper = document.querySelector('.image-container');
let movieCount = 0;

const displayMoives = async (baseMovieURL) => {
  for (let i = 20; i < 32; i += 1) {
    movieCount += 1;
    fetch(baseMovieURL + i)
      .then((response) => response.json())
      .then((result) => {
        const movieBtn = document.createElement('div');
        movieBtn.classList.add('movieBtn');
        const genere = document.createElement('p');
        const summary = document.createElement('p');
        const reservation = document.createElement('button');
        summary.classList.add('summary');
        genere.textContent = result.genres;
        reservation.textContent = 'Reservation';
        const movie = movieCard(result, i, involvementLikes);
        const comment = commentPopUp(involvementComments, i, result);
        movieBtn.append(comment, reservation);
        movie.append(movieBtn);
        movieWrapper.appendChild(movie);
      });
  }
  const movieCounter = document.getElementById('movieCount');
  movieCounter.innerHTML = countAllMovies(movieCount);
};

document.addEventListener('DOMContentLoaded', () => {
  displayMoives(baseMovieURL);
});

export default involvementLikes;
