const cells = document.querySelectorAll('.cell')
let firstClick;

cells.forEach(cell => {
  cell.addEventListener('click', function(event) {
    if (!firstClick) {
      firstClick = event.target;
    } else {
      const secondClick = event.target;
      animate(firstClick, secondClick);
      firstClick = null;
    }
  });
})

function animate(fromDiv, toDiv) {
  console.log('animating from', fromDiv, toDiv);
  const traveller = fromDiv.cloneNode();
  traveller.style.left = fromDiv.offsetLeft + 'px';
  traveller.style.top = fromDiv.offsetTop + 'px';
  traveller.classList.add('animated');
  fromDiv.offsetParent.appendChild(traveller);
  fromDiv.classList.remove('marble');
  traveller.style.left = toDiv.offsetLeft + 'px';
  traveller.style.top = toDiv.offsetTop + 'px';
  setTimeout(() => {
    toDiv.classList.add('marble');
    traveller.remove();
  }, 1000);
}
