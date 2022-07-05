'use strict';

function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}
  
  /* add class 'active' to the clicked link */
  
  clickedElement.add('active')
  console.log('clickedElement:', clickedElement);
  
  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}
  
  /* get 'href' attribute from the clicked link */
  
  
  const articleSelector = document.querySelectorAll('href');
  clickedElement = articleSelector.getAttribue('href');
  console.log('clickedElement:', 'href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = querySelector('href');
  console.log('clickedElement:', targetArticle);
  
  /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
