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
const optArticleAuthorSelector = '.post-author'

function generateTitleLinks(customSelector = '') {
   /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '' ;
  
  
  /* for each article */

   const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

generateTitleLinks();

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

    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log(tagsList);
    
    /* make html variable with empty string */

    let html = '';
    
    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    
    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    
    /* START LOOP: for each tag */

    for(let tag of articleTagsArray) {
    console.log(articleTagsArray);
      
      /* generate HTML of the link */

      const linkHTML='<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
  console.log(linkHTML);
      
      /* add generated code to html variable */

      html = html + linkHTML;
      console.log(html);
      
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */

    tagsList.innerHTML = html;
    
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);
  
  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  
  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);
  
  /* START LOOP: for each active tag link */

  for(let activeTagLink of activeTagLinks) {
  
    /* remove class active */

    activeTagLink.classList.remove('active');
    
  /* END LOOP: for each active tag link */
    
  }
  
  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  
  /* START LOOP: for each found tag link */

  for(let tagLink of tagLinks) {
  
    /* add class active */

    tagLink.classList.add('active');
    
  /* END LOOP: for each found tag link */

  }
    
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */

  const links = document.querySelectorAll('a[href^="#tag-"]');
  
  /* START LOOP: for each link */

  for(const link of links){
  
    /* add tagClickHandler as event listener for that link */
  
    link.addEventListener("click", tagClickHandler);
    
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();



function generateAuthor(){
  /* find all articles */
  
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  
  /* START LOOP: for every article: */

  for(let article of articles){
  
    /* find tags wrapper */

    const authorList = article.querySelector(optArticleAuthorSelector);
    console.log(authorList);
    
    /* make html variable with empty string */

    let html = '';
    
    /* get author from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    
     /* generate HTML of the link */

    const linkHTML = '<a href ="#author' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
    console.log('Created html of the link');
    
    
    /* add generated code to html variable */

    html = html + linkHTML;
    console.log(html);

    
    /* insert HTML of all the links into the author wrapper */

    authorList.innerHTML = html;
    
  /* END LOOP: for every article: */
  }
}

generateAuthor();

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);
  
  /* make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author', '');
  
  /* find all author links with class active */

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author"]');
  console.log(activeAuthorLinks);
  
  /* START LOOP: for each active tag link */

  for(let activeAuthorLink of activeAuthorLinks) {
  
    /* remove class active */

    activeAuthorLink.classList.remove('active');
    
  /* END LOOP: for each active tag link */
    
  }
  
  /* find all author links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  
  /* START LOOP: for each found author link */

  for(let authorLink of authorLinks) {
  
    /* add class active */

    authorLink.classList.add('active');
    
  /* END LOOP: for each found author link */

  }
    
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthor(){
  /* find all links to author */

  const links = document.querySelectorAll('a[href^="#author"]');
  
  /* START LOOP: for each link */

  for(const link of links){
  
    /* add tagClickHandler as event listener for that link */
  
    link.addEventListener("click", tagClickHandler);
    
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthor();

   
