import { addToInvolvement } from './toInvolvementAPI.js';

const movieCard = (result, involvementLikes) => {
  const movie = document.createElement('div');
  movie.classList.add('movie');
  movie.id = result.id;

  const img = document.createElement('img');
  img.alt = 'Movie Image';

  const movieDes = document.createElement('div');
  movieDes.classList.add('movieDesc');

  const movieDesTop = document.createElement('div');
  movieDesTop.classList.add('movieDescTop');

  const movieTitle = document.createElement('p');
  movieTitle.textContent = result.name;
  movieTitle.style.fontWeight = 'bold';

  const like = document.createElement('a');
  const icon = document.createElement('i');
  icon.classList.add('fa', 'fa-heart');

  const likesP = document.createElement('p');
  const likeSpan = document.createElement('span');

  likesP.append(likeSpan, ' likes');
  like.appendChild(icon);

  let clicked;
  fetch(involvementLikes, { method: 'GET' })
    .then((response) => response.json())
    .then((result) => {
      const filteredResult = result.filter((r) => r.item_id === `${result.id}`);
      likeSpan.textContent = filteredResult[0]?.likes;
      clicked = filteredResult[0]?.likes;
    });

  like.addEventListener('click', () => {
    clicked += 1;
    addToInvolvement(involvementLikes, result.id, clicked);
    likeSpan.textContent = clicked;
  });

  img.src = result.image.medium;
  movieDesTop.append(movieTitle, like);
  movieDes.append(movieDesTop, likesP);

  movie.append(img, movieDes);

  return movie;
};

export default movieCard;
