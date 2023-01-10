'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 6,
  optCloudClassPrefix = 'tag-size-',
  optArticleAuthorsListSelector = '.authors.list';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked');

  /* [DONE] remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('targetArticle');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('Article is visible');
}


function generateTitleLinks(customSelector = ''){
  console.log('Title List was generated');
  console.log(customSelector);

  /* [DONE] remove contents of TitleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  console.log(optArticleSelector + customSelector);
  for(let article of articles){

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId');

    /* [DONE] find the title element */

    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const articleLinkHTMLData = {id: articleId, title: articleTitle};
    const articleLinkHTML = templates.articleLink(articleLinkHTMLData);
    // console.log('Created HTML of the link');

    /* [DONE] insert link into html variable */

    html = html + articleLinkHTML;
    // console.log(html);
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
    // console.log(link);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){
  const params = {
    max : 0,
    min : 999999,
  };

  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    console.log(tag + ' is used ' + tags[tag] + ' times ');

  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount -1) + 1);
  return optCloudClassPrefix + classNumber;
}



function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){

    /* [DONE] find tags wrapper */

    const titleList = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){
      // console.log(tag);

      /* [DONE] generate HTML of the link */

      // const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
      const tagLinkHTMLData = {id: 'tag-' + tag, title: tag};
      const tagLinkHTML = templates.tagLink(tagLinkHTMLData);
      // console.log('Created HTML of the link');

      /* [DONE] add generated code to html variable */

      html = html + tagLinkHTML;

      // console.log(html);

      /* END LOOP: for each tag */

      /* [NEW] check if this link is NOT already in allTags */

      if(!allTags.hasOwnProperty(tag)){

        /* [NEW] add generated code to allTags object */

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    titleList.innerHTML = html;

  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /* [NEW] create variable for all links HTML code */
  // let allTagsHTML = '';
  const allTagsData = {tags: []};

  /* [NEW] start loop: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    // const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '(' + CalculateTagClass(allTags[tag], tagsParams) + ')</span></a>(' + allTags[tag] + ')</li>';
    // const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
    // allTagsHTML += tagLinkHTML;

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  /* [NEW] end loop: for each tag in allTags: */
  }

  /* [NEW] add html from allTagsHTML to tagList */
  // tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('Tag was clicked');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */

  for(let activeTagLink of activeTagLinks){

    /* [DONE] remove class active */

    activeTagLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */

  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for(let tagLink of tagLinks){

    /* [DONE] add class active */

    tagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */

  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

  const allTagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for(let allTagLink of allTagLinks){

    /* add tagClickHandler as event listener for that link */

    allTagLink.addEventListener('click', tagClickHandler);
    console.log(allTagLink);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  //console.log('Authors were generated');
  let allAuthors = {};

  /* [DONE] Find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* [DONE] Start loop for every article */

  for(let article of articles){

    /* [DONE] find authors wrapper */

    const titleList = article.querySelector(optArticleAuthorSelector);
    console.log(article);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get author from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    /* [DONE] generate HTML of the link */

    // const linkHTML = '<a href ="#author' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
    const authorLinkHTMLData = {id: 'author' + articleAuthor, title: articleAuthor};
    const authorLinkHTML = templates.authorLink(authorLinkHTMLData);
    // console.log('Created html of the link');

    /* [DONE] add generated code to html variable */

    html = html + authorLinkHTML;
    console.log(html);

    if(!allAuthors.hasOwnProperty(articleAuthor)){

      /* [NEW] add generated code to allTags object */

      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    /* [DONE] insert HTML of all the links into the authors wrapper */

    titleList.innerHTML = html;

    /* [DONE] End loop for every article */

  }

  const authorList = document.querySelector(optArticleAuthorsListSelector);
  // let allAuthorsHTML = '';
  const allAuthorsData = {authors: []};
  for(let author in allAuthors){
    const authorLinkHTML = '<li><a href="#author' + author + '">' + author + '</a>(' + allAuthors[author] + ')</li>';
    // allAuthorsHTML += authorLinkHTML;
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    }

    )
  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event){

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make a new constant named "ClickedElement" and give it value of "this" */

  const clickedElement = this;
  // console.log(clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  // console.log(href);

  /* [DONE] make a new constant author and extract author from the href  constant */

  const author = href.replace('#author', '');
  // console.log(author);

  /* [DONE] find all authors links with class active */

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author"]');
  // console.log(activeAuthorLinks);

  /* [DONE] start loop for each active author link */

  for(let activeAuthorLink of activeAuthorLinks){

    /* [DONE] remove class active */

    activeAuthorLink.classList.remove('active');

    /* end loop for each active author link */

  }

  /* [DONE] find all author links with href attribute equal to the href constant */

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  // console.log(authorLinks);

  /* [DONE] start loop for each found author link */

  for(let authorLink of authorLinks){

    /* [DONE] add class active */

    authorLink.classList.add('active');
    // console.log(authorLink);

    /* [DONE] end loop for each found author link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){

  /* [DONE] find all links to authors */

  const allAuthorLinks = document.querySelectorAll('a[href^="#author"]');

  /* [DONE] start loop: for each link */

  for(let allAuthorLink of allAuthorLinks){

    /* [DONE] add AuthorClickHandler as event listener for that link */

    allAuthorLink.addEventListener('click', authorClickHandler);
    // console.log(allAuthorLink);

  /* [DONE] end loop: for each link */
  }
}

addClickListenersToAuthors();