---
title: "Curriculum vitae"
date: 2020-08-17T13:05:57+02:00
description: "Timur Kulenović - portfolio"
---

You can also [get my CV in PDF](/cv/cv.pdf).

<script type="text/javascript" src="/js/pdf-js/build/pdf.js"></script>
<style>
#the-canvas {
  border: 1px solid black;
  direction: ltr;
  width: 100%;
  height: auto;
  display: none;
}

#paginator {
  display: none;
  text-align: center;
  margin-bottom: 10px;
}

#loadingWrapper {
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 350px;
}

#loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #d2d0d0;;
  border-radius: 50%;
  border-top-color: #383838;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>

<div id="paginator">
    <button id="prev">Previous</button>
    <button id="next">Next</button>
    &nbsp; &nbsp;
    <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
</div>
<div id="embed-pdf-container">
    <div id="loadingWrapper">
      <div id="loading"></div>
    </div>
    <a id="pdf-link"><canvas id="the-canvas"></canvas></a>
</div>

<script type="text/javascript">
window.onload = function() {
var url = "/cv/cv.pdf";
document.getElementById("pdf-link").href = url

var hidePaginator = "true" === "true";
var hideLoader = "" === "true";
var selectedPageNum = parseInt("") || 1;

var pdfjsLib = window['pdfjs-dist/build/pdf'];

pdfjsLib.GlobalWorkerOptions.workerSrc = "/js/pdf-js/build/pdf.worker.js";

var pdfDoc = null,
    pageNum = selectedPageNum,
    pageRendering = false,
    pageNumPending = null,
    scale = 3,
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d'),
    paginator = document.getElementById("paginator"),
    loadingWrapper = document.getElementById('loadingWrapper');

showPaginator();
showLoader();

function renderPage(num) {
  pageRendering = true;
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport({scale: scale});
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    renderTask.promise.then(function() {
      pageRendering = false;
      showContent();
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });
  document.getElementById('page_num').textContent = num;
}

function showContent() {
  loadingWrapper.style.display = 'none';
  canvas.style.display = 'block';
}

function showLoader() {
  if(hideLoader) return
  loadingWrapper.style.display = 'flex';
  canvas.style.display = 'none';
}

function showPaginator() {
  if(hidePaginator) return
  paginator.style.display = 'block';
}

function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

function onPrevPage() {
  if (pageNum <= 1) { return; }
  pageNum--;
  queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

function onNextPage() {
  if (pageNum >= pdfDoc.numPages) { return; }
  pageNum++;
  queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);

pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  var numPages = pdfDoc.numPages;
  document.getElementById('page_count').textContent = numPages;
  if(pageNum > numPages) { pageNum = numPages }
  renderPage(pageNum);
});
}
</script>
