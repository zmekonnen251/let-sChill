const closeComment = (commentWraper) => {
  commentWraper.classList.add('dn');
  document.querySelector('main').classList.toggle('blur-50vh');
  document.querySelector('footer').classList.toggle('blur');
  window.location.reload();
};

export default closeComment;
