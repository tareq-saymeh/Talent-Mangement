
//sidebar active class addition
const menuLinks = document.querySelectorAll('#sidebar a');
const currentPath = location.pathname;

menuLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});
//end of sidebar active class addition
  



  








