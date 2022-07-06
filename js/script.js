'use strict';

function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}
  
  /* add class 'active' to the clicked link */
 
  clickedElement.classList.add('active')
  console.log('clickedElement:', clickedElement);
  
  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}
  
  /* get 'href' attribute from the clicked link */
  
  
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  
  /* add class 'active' to the correct article */
  
  targetArticle.classList.add('active');
}



const optArticleSelector = '.post'
const optTitleSelector = '.post-title'
const optTitleListSelector = '.titles'
const optArticleTagsSelector = '.post-tags .list'

function generateTitleLinks () {
   /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '' ;
  
  
  /* for each article */

   const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles', articles)
  let html = '';
  
  for(let article of articles){
  
    /* get the article id */
  
  const articleId = article.getAttribute('id');
  console.log(articleId);
  
    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
    /* get the title from the title element */
  
    /* create HTML of the link */

  const linkHTML='<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
  console.log(linkHTML);
  
    /* insert link into titleList */
    
        html = html + linkHTML;
  }
    titleList.innerHTML = html;
}

generateTitleLinks ();

const links = document.querySelectorAll('.titles a');
console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* find all articles */
  
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  
  /* START LOOP: for every article: */

  for(let article of articles){
  
    /* find tags wrapper */

    const titleList = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    
    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
  }
}

generateTags();
