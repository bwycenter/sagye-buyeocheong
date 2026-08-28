/* =========================================
   사계 부여청
   페이지 이동 + 계절 테마 + 책 페이지
========================================= */


/* =========================================
   책 페이지 설정

   이미지가 1개인 사업
   book01.jpg

   이미지가 2개인 사업
   book12-1.jpg
   book12-2.jpg
========================================= */

const bookPages = {

  activity01: [
    "book01.jpg"
  ],

  activity02: [
    "book02.jpg"
  ],

  activity03: [
    "book03.jpg"
  ],

  activity04: [
    "book04.jpg"
  ],

  activity05: [
    "book05.jpg"
  ],

  activity06: [
    "book06.jpg"
  ],

  activity07: [
    "book07.jpg"
  ],

  activity08: [
    "book08-1.jpg",
    "book08-2.jpg"
  ],

  activity09: [
    "book09.jpg"
  ],

  activity10: [
    "book10-1.jpg",
    "book10-2.jpg"
  ],

  activity11: [
    "book11.jpg"
  ],

  activity12: [
    "book12-1.jpg",
    "book12-2.jpg"
  ],

  activity13: [
    "book13.jpg"
  ],

  activity14: [
    "book14.jpg"
  ],

  activity15: [
    "book15.jpg"
  ],

  activity16: [
    "book16.jpg"
  ],

  activity17: [
    "book17.jpg"
  ],

  activity18: [
    "book18-1.jpg",
    "book18-2.jpg"
  ],

  activity19: [
    "book19.jpg"
  ],

  activity20: [
    "book20.jpg"
  ],

  activity21: [
    "book21.jpg"
  ],

  activity22: [
    "book22.jpg"
  ],

  activity23: [
    "book23.jpg"
  ],

  activity24: [
    "book24.jpg"
  ],

  activity25: [
    "book25.jpg"
  ],

  activity26: [
    "book26.jpg"
  ],

  activity27: [
    "book27.jpg"
  ],

  activity28: [
    "book28.jpg"
  ],

  activity29: [
    "book29.jpg"
  ],

  activity30: [
    "book30.jpg"
  ],

  activity31: [
    "book31.jpg"
  ],

  activity32: [
    "book32.jpg"
  ],

  activity33: [
    "book33.jpg"
  ],

  activity34: [
    "book34.jpg"
  ]

};



/* =========================================
   계절별 테마 설정
========================================= */

function setSeasonTheme(pageId) {

  let season = "home";


  /* 봄 관련 페이지 */
  const springPages = [
    "spring",
    "women",
    "youth",
    "wifi",
    "cafe",
    "dodang",
    "sosa"
  ];


  if (springPages.includes(pageId)) {
    season = "spring";
  }


  /* 현재 상세페이지 01~34는 봄편 */
  if (pageId.startsWith("activity")) {
    season = "spring";
  }


  /* 여름 */
  if (pageId === "summer") {
    season = "summer";
  }


  /* 가을 */
  if (pageId === "autumn") {
    season = "autumn";
  }


  /* 겨울 */
  if (pageId === "winter") {
    season = "winter";
  }


  document.body.setAttribute(
    "data-season",
    season
  );

}



/* =========================================
   페이지 이동
========================================= */

function goPage(pageId) {

  const pages =
    document.querySelectorAll(".page");


  pages.forEach(function(page) {

    page.classList.remove("active");

  });


  const targetPage =
    document.getElementById(pageId);


  if (targetPage) {

    targetPage.classList.add("active");

  }

  else {

    const home =
      document.getElementById("home");


    if (home) {

      home.classList.add("active");

    }


    pageId = "home";

  }


  /* 계절 테마 변경 */
  setSeasonTheme(pageId);


  /* 화면 맨 위로 */
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  /* 주소창 해시 변경 */
  history.pushState(
    { page: pageId },
    "",
    "#" + pageId
  );

}



/* =========================================
   페이지 표시
   새로고침 / 뒤로가기용
========================================= */

function showPageOnly(pageId) {

  const pages =
    document.querySelectorAll(".page");


  pages.forEach(function(page) {

    page.classList.remove("active");

  });


  const targetPage =
    document.getElementById(pageId);


  if (targetPage) {

    targetPage.classList.add("active");

    setSeasonTheme(pageId);

  }

  else {

    const home =
      document.getElementById("home");


    if (home) {

      home.classList.add("active");

    }


    setSeasonTheme("home");

  }

}



/* =========================================
   브라우저 뒤로가기 / 앞으로가기
========================================= */

window.addEventListener(
  "popstate",
  function() {

    const pageId =
      location.hash.replace("#", "")
      || "home";


    showPageOnly(pageId);


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);



/* =========================================
   책 이미지가 없을 경우
========================================= */

function handleBookImageError(image) {

  image.style.display = "none";


  const placeholder =
    image.nextElementSibling;


  if (placeholder) {

    placeholder.style.display = "flex";

  }

}



/* =========================================
   책 페이지 영역 만들기
========================================= */

function createBookSection(
  activityId,
  files
) {

  const section =
    document.createElement("section");


  section.className =
    "book-page-section";


  const activityPage =
    document.getElementById(activityId);


  let activityTitle =
    "봄의 이야기";


  if (activityPage) {

    const title =
      activityPage.querySelector(
        ".story-cover h1"
      );


    if (title) {

      activityTitle =
        title.textContent
          .replace(/\s+/g, " ")
          .trim();

    }

  }



  const imageHTML =
    files
      .map(function(file) {

        return `
          <div class="book-page-frame">

            <img
              src="images/${file}"
              alt="${activityTitle} 사계 부여청 책 페이지"
              loading="lazy"
              onerror="handleBookImageError(this)"
            >

            <div class="book-page-placeholder">

              <div>

                <strong>
                  ${file}
                </strong>

                <br><br>

                여기에 「사계 부여청」
                <br>
                실제 책 페이지 이미지를
                넣어주세요.

              </div>

            </div>

          </div>
        `;

      })
      .join("");



  const imageClass =
    files.length === 1
      ? "book-page-images single"
      : "book-page-images";



  section.innerHTML = `

    <div class="book-page-header">

      <p class="section-label">
        MAGAZINE
      </p>

      <h2>
        책으로 보는
        <br>
        봄의 이야기
      </h2>

      <p>
        「사계 부여청」 봄편에 수록된
        실제 지면을 함께 만나보세요.
      </p>

    </div>


    <div class="${imageClass}">

      ${imageHTML}

    </div>


    <p class="book-page-caption">
      四季 부여청 · SPRING 2026
    </p>

  `;


  return section;

}



/* =========================================
   각 상세페이지에 책 지면 삽입
========================================= */

/* =========================================
각 상세페이지에 책 지면 삽입

순서
상세내용
→ 활동 정보
→ 실제 책자
→ 돌아가기
========================================= */

function insertBookSections() {

  Object.keys(bookPages)
  .forEach(function(activityId) {

    const activityPage =
      document.getElementById(activityId);


    if (!activityPage) {
      return;
    }


    if (
      activityPage.querySelector(
        ".book-page-section"
      )
    ) {
      return;
    }


    const files =
      bookPages[activityId];


    const bookSection =
      createBookSection(
        activityId,
        files
      );



    /* =====================================
       활동 정보가 있는 상세페이지
    ====================================== */

    const activityInfo =
      activityPage.querySelector(
        ".activity-info"
      );


    if (activityInfo) {

      /* 활동정보 안에 있는
         돌아가기 버튼을 먼저 분리 */

      const backButton =
        activityInfo.querySelector(
          ".back-button"
        );


      if (backButton) {
        backButton.remove();
      }



      /* 활동 정보 바로 다음에
         책자 지면 삽입 */

      activityInfo.insertAdjacentElement(
        "afterend",
        bookSection
      );



      /* 책자 다음에
         돌아가기 버튼 배치 */

      if (backButton) {

        const backWrap =
          document.createElement("div");


        backWrap.className =
          "book-back-wrap";


        backWrap.appendChild(
          backButton
        );


        bookSection.insertAdjacentElement(
          "afterend",
          backWrap
        );

      }


      return;

    }



    /* =====================================
       활동 정보가 없는 짧은 상세페이지
    ====================================== */

    const backButton =
      activityPage.querySelector(
        ".back-button"
      );


    if (backButton) {
      backButton.remove();
    }


    activityPage.appendChild(
      bookSection
    );


    if (backButton) {

      const backWrap =
        document.createElement("div");


      backWrap.className =
        "book-back-wrap";


      backWrap.appendChild(
        backButton
      );


      activityPage.appendChild(
        backWrap
      );

    }

  });

}



/* =========================================
   최초 실행
========================================= */

window.addEventListener(
  "DOMContentLoaded",
  function() {


    /* 책 페이지 자동 삽입 */
    insertBookSections();


    /* 현재 주소에 맞는 페이지 표시 */
    const pageId =
      location.hash.replace("#", "")
      || "home";


    showPageOnly(pageId);

  }
);