"use strict";

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector("#template-article-link").innerHTML
  ),
  articleTag: Handlebars.compile(
    document.querySelector("#template-article-tag").innerHTML
  ),
  articleAuthor: Handlebars.compile(
    document.querySelector("#template-article-author").innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector("#template-tag-cloud-link").innerHTML
  ),
  tagLinkRight: Handlebars.compile(
    document.querySelector("#template-article-author-tag").innerHTML
  ),
};

function titleClickHandler(event) {
  event.preventDefault();

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active ");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* add class 'active' to the clicked link */

  const clickedElement = this;

  clickedElement.classList.add("active");

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(".post ");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute("href");

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */

  targetArticle.classList.add("active");
}
/*nowa funkcja */

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author",
  optTagsListSelector = ".list.tags",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size-",
  optAuthorsListSelector = ".authors.list";

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

  /* for each article */

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  let html = "";

  for (let article of articles) {
    /* get the article id */

    const articleId = article.getAttribute("id");

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle + "dsssssssssssssssssssssssssssss)");

    /* create HTML of the link */
    /*const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>"; */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into html variable */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999 };
  for (let tag in tags) {
    console.log(tag + " is used " + tags[tag] + " times");

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

// ja wyłącze te funkjcę to będzie działać

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty OBJECT */
  let allTags = {};
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = "";

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute("data-tags");

    /* split tags into array */

    const articleTagsArray = articleTags.split(" ");

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      /* generate HTML of the link */

      /*const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>";*/

      const linkHTMLData = { id: "tag-" + tag, title: tag };
      const linkHTML = templates.articleTag(linkHTMLData);

      /* insert link into html variable */
      html = html + " " + linkHTML;

      /* add generated code to html variable */

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper tagWrapper = tagsList */
    tagsList.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagsList = document.querySelector(optTagsListSelector);

  /* NEW create variable for all link HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log("tagsParams,", tagsParams);

  /* [NEW] add html from allTags to tagList */
  //let allTagsHTML = " " + " ";
  const allTagsData = { tags: [] };
  let Link = "";

  /* NEW Start Loop: for each tag in alltags */

  for (let tag in allTags) {
    /*generate code of a link and add it to alltahshtml*/
    /* Link =
      '<li><a href="#tag-' +
      tag +
      '"><span>' +
      tag +
      "</span></a>(" +
      allTags[tag] +
      ")</li>"; */

    Link =
      "<li><a href=#tag-" +
      tag +
      " class=" +
      calculateTagClass(allTags[tag], tagsParams) +
      ">" +
      tag +
      "</a></li>" +
      " ";
    // allTagsHTML += Link
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });

    /*NEW END LOOP for each tag in allTags*/
  }
  /*NEW add html from alltagshtml to taglist*/

  //tagsList.innerHTML = allTagsHTML;

  tagsList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData + "ffffffffffffffffffffffffffffffffffffffff");
}

generateTags();

function tagClickHandler(event) {
  console.log("Function tagClickHandler has been run.");

  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log("clicked tag");

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute("href");
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace("#tag-", "");

  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove("active");

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener("click", tagClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allTags with an empty OBJECT */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const author = article.getAttribute("data-author");

    /* generate HTML of the link */
    /* const linkHTML =
      '<a href="#author' + author + '"><span>' + author + "</span></a>"; */

    const linkHTMLData = { id: "author" + author, title: author };
    const linkHTML = templates.articleAuthor(linkHTMLData);

    /* insert link into html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors.hasOwnProperty(author)) {
      /* [NEW] add generated code to allTags array */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    } /* insert HTML of all the links into the tags wrapper tagWrapper = tagsList */

    authorWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const authorTagsList = document.querySelector(optAuthorsListSelector);
  /* NEW create variable for all link HTML code */
  const authorTagsParams = calculateAuthorsParams(allAuthors);
  //let allAuthorsHTML = "";
  const allAuthorsData = { author: [] };

  let Link = "";

  for (let author in allAuthors) {
    Link =
      /*"<li class=" +
      calculateTagClass(allAuthors[author], authorTagsParams) +
      '><a href="#author-' +
      author +
      '"><span>' +
      author +
      "</span></a>"; */

      '<li><a href="#author' +
      author +
      '"><span>' +
      author +
      " (" +
      allAuthors[author] +
      ")" +
      "</span></a></li>";

    // allAuthorsHTML += Link;
    allAuthorsData.author.push({
      author: author,
      count: allAuthors[author],
      className: calculateTagClass(allAuthors[author], authorTagsParams),
    });
  }
  // authorTagsList.innerHTML = allAuthorsHTML;

  authorTagsList.innerHTML = templates.tagLinkRight(allAuthorsData);
}

generateAuthors();

function calculateAuthorsParams(authors) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let author in authors) {
    console.log(author + "is used" + authors[author] + "times");

    if (authors[author] > params.max) {
      params.max = authors[author];
    }

    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }

  return params;
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("autor klknięty");
  const href = clickedElement.getAttribute("href");
  console.log(href);
  const author = href.replace("#author", "");
  const authorActives = document.querySelectorAll('a.active[href^="#author"]');
  for (let authorActive of authorActives) {
    /* remove class active */
    authorActive.classList.remove("active");

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  const findAllAuthors = document.querySelectorAll('a[href="' + href + '"]');
  console.log(findAllAuthors);

  /* START LOOP: for each found tag link */

  for (let findAllAuthor of findAllAuthors) {
    /* add class active */
    findAllAuthor.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */

  const links = document.querySelectorAll('a[href^="#author"]');
  console.log(links);

  /* START LOOP: for each link */

  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", authorClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();

console.log(this);

function foo() {
  console.log(this);
}

foo();