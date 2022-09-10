import { DateTime } from 'luxon';
import { addCommentToInvolvement } from './toInvolvementAPI.js';
import { commentCounterFunc } from './commentCounter.js';
import closeComment from './utilities.js';
import xIcon from '../images/x-icon.png';

export default (involvementComments, i, result) => {
  const commentWraper = document.querySelector('.comment-main-container');
  const comment = document.createElement('button');
  comment.textContent = 'Comment';
  const genere = document.createElement('p');
  const summary = document.createElement('p');
  comment.addEventListener('click', () => {
    commentWraper.classList.remove('dn');
    document.querySelector('main').classList.toggle('blur-50vh');
    document.querySelector('footer').classList.toggle('blur');

    const closeIcon = new Image();
    closeIcon.classList.add('x-icon');

    closeIcon.src = xIcon;

    closeIcon.addEventListener('click', () => {
      closeComment(commentWraper);
    });

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment-container');
    const commentListContainer = document.createElement('div');
    commentListContainer.classList.add('comment-list-container');
    const commentsCounter = document.createElement('h3');
    commentsCounter.style.textAlign = 'center';
    commentsCounter.style.margin = '20px 0';

    const commentLists = document.createElement('ul');
    commentLists.classList.add('comment-lists');
    let commentCount;

    fetch(`${involvementComments}?item_id=${i}`, { method: 'GET' })
      .then((response) => response.json())
      .then((result) => {
        commentCount = commentCounterFunc(result);
        commentsCounter.innerHTML = `Comments (${commentCount})`;
        result.forEach((commentItem) => {
          const commentListItem = document.createElement('li');
          commentListItem.innerHTML = `<strong><time>${commentItem.creation_date}</time> <span>${commentItem.username}</span></strong> : <span>${commentItem.comment}</span>`;
          commentLists.appendChild(commentListItem);
        });
      });

    commentListContainer.append(commentsCounter, commentLists);

    commentContainer.classList.add('comment-container');
    const orginalImg = document.createElement('img');
    const movieTitle = document.createElement('p');
    movieTitle.style.fontWeight = 'bold';
    orginalImg.src = result.image.original;
    orginalImg.classList.add('orginal-image');
    movieTitle.textContent = result.name;
    genere.textContent = result.genres;

    summary.innerHTML = result.summary;
    summary.style.fontStyle = 'italic';
    commentContainer.append(
      orginalImg,
      movieTitle,
      genere,
      summary,
      commentListContainer,
    );
    commentContainer.appendChild(closeIcon);
    document.querySelector('form').classList.toggle('dn');
    commentWraper.prepend(commentContainer);

    const usernameInput = document.querySelector('#user-name');
    const commentInput = document.querySelector('#comment-message');
    const commentSubmitBtn = document.querySelector('#submit-comment');

    commentSubmitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (usernameInput.value !== '' && commentInput.value !== '') {
        commentCount += 1;
        commentsCounter.innerHTML = `Comments (${commentCount})`;
        const username = usernameInput.value;
        const comment = commentInput.value;

        addCommentToInvolvement(involvementComments, i, username, comment);

        const datePosted = DateTime.now().toFormat('yyyy-MM-dd');
        const newComment = document.createElement('li');
        newComment.innerHTML = `<strong><time>${datePosted}</time> <span>${username}</span></strong> : <span>${comment}</span>`;
        commentLists.appendChild(newComment);
      }

      usernameInput.value = '';
      commentInput.value = '';
    });
  });
  return comment;
};
