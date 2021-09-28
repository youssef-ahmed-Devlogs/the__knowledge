const ideasFilterTabs = document.querySelectorAll(".ideas-filter-tabs li");
const ideasContainer = document.querySelector(".ideas-container");
const ideaCards = document.querySelectorAll(".ideas-container .idea-card");
const searchInput = document.getElementById("ideas-search");
const selectSortBy = document.getElementById("sort");
const selectSortType = document.getElementById("sort-type");
const mainIdeasData = [];

ideaCards.forEach((idea) => {
  const singleIdeaData = {
    ideaType: idea.getAttribute("data-ideaType"),
    orderNumber: idea.querySelector(".order-number").innerText,
    ideaTitle: idea.querySelector(".idea-card-title").innerText,
    currentStep: idea.querySelector(".idea-progress").dataset.step,
    createdDate: idea.querySelector(".card-date .date").innerText,
    ideaUserImgae: idea.querySelector(".card-user img").getAttribute("src"),
    ideaUsername: idea.querySelector(".card-user .idea-username").innerText,
  };

  mainIdeasData.push(singleIdeaData);
});

let ideasData = [...mainIdeasData];

drawUi(mainIdeasData);

searchInput.addEventListener("keyup", ({ target }) => {
  const value = target.value.trim().toLowerCase();

  const searchedIdeas = ideasData.filter((item) =>
    item.ideaTitle.trim().toLowerCase().includes(value)
  );
  drawUi(searchedIdeas);
});

let qSort = "";

selectSortBy.addEventListener("change", (e) => {
  qSort = e.target.value;
  switch (qSort) {
    case "sort by":
      drawUi(toggleSort(mainIdeasData));
      break;
    case "date":
      drawUi(toggleSort(sortedByDate()));
      break;
    case "order number":
      drawUi(toggleSort(sortedByNumber()));
  }
});

let qSortType = "";

selectSortType.addEventListener("change", ({ target }) => {
  qSortType = target.value;

  if (qSort === "order number") {
    drawUi(toggleSort(sortedByNumber()));
  } else if (qSort === "date") {
    drawUi(toggleSort(sortedByDate()));
  }
});

function sortedByNumber() {
  ideasData = [...mainIdeasData];
  let sort = ideasData.sort((a, b) => {
    return a.orderNumber - b.orderNumber;
  });

  if (qSortType === "reverse") {
    sort.reverse();
    return sort;
  }

  return sort;
}

function sortedByDate() {
  ideasData = [...mainIdeasData];

  let sort = ideasData.sort(function (a, b) {
    var dateA = new Date(a.createdDate),
      dateB = new Date(b.createdDate);
    return dateA - dateB;
  });

  if (qSortType === "reverse") {
    sort.reverse();
    return sort;
  }

  return sort;
}
sortedByDate();

function toggleSort(items) {
  return items.filter((item) =>
    item.ideaTitle.trim().toLowerCase().includes(searchInput.value)
  );
}

function drawUi(items) {
  const UI = items.map((item) => {
    return `
                  
              <div
                  class="
                  ${item.ideaType}
                  card-container
                  col-lg-4 col-md-6 col-sm-6 col-12
                  m-b30
                  idea-card
                  animate__animated animate__zoomInDown
                  "
              >
                  <div class="dez-box p-a20 border-1 bg-gray">
                      <div class="dez-info">
                          <span class="order-number">
                              I-${item.orderNumber}
                          </span>
                          <h4 class="dez-title m-t20 font-weight-bold">
                              <a href="#" class="idea-card-title">${item.ideaTitle}</a>
                          </h4>
                          <div class="idea-progress ${item.currentStep}"  data-step="${item.currentStep}">
                          <ul class="list-unstyled">
                              <li>مراجعة</li>
                              <li>التقييم</li>
                              <li>التطبيق</li>
                              <li>مغلقة</li>
                          </ul>
                      </div>
                      <div class="card-date">
                          <span>
                              <i class="fa fa-calendar" aria-hidden="true">
                              </i>
                              <span class="date">${item.createdDate}</span>
                          </span>
                      </div>
                      <div class="card-user mt-4">
                          <div class="user-img mr-3">
                              <img src="${item.ideaUserImgae}" alt="" />
                          </div>
                          <h4 class="idea-username">${item.ideaUsername}</h4>
                      </div>
                  </div>
                  </div>
              </div>
  
              `;
  });

  ideasContainer.innerHTML = UI.join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const masonry = document.getElementById("masonry");
  const teamIdeasItems = document.querySelectorAll(".team-ideas");
  const singleIdeasItems = document.querySelectorAll(".single-ideas");
  let itemsLen = 1;

  ideasFilterTabs.forEach((item) => {
    item.addEventListener("click", () => {
      fun(ideaCards);
      fixHeightIssue(masonry, 350, itemsLen);
    });
  });

  function fun(selector) {
    if (window.innerWidth > 0 && window.innerWidth <= 575) {
      itemsLen = Math.ceil(selector.length / 1);
    } else if (window.innerWidth > 575 && window.innerWidth <= 991) {
      itemsLen = Math.ceil(selector.length / 2);
    } else if (window.innerWidth > 991) {
      itemsLen = Math.ceil(selector.length / 3);
    }
  }
});

function fixHeightIssue(masonry, height, itemsLen) {
  setTimeout(() => {
    masonry.style.height = `${height * itemsLen}px`;
  }, 150);
}
