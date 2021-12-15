window.onload = (event) => {

  var timeoutID;
  document.getElementById("app").innerHTML = layout();
  document.getElementById("spinner").hidden=true;
  var resultElement = document.getElementById("results");
  document.getElementById("search").addEventListener("keyup", async (event) => {
    document.getElementById("spinner").hidden=false;
    document.getElementById("results").hidden=true;
    if(timeoutID){
      clearTimeout(timeout);
    }
    setTimeout(async function () {
      var resultElements = await fetchData(event.target.value);
      document.getElementById("spinner").hidden=true;
      document.getElementById("results").hidden=false;
      var searchTerm = document.getElementById("search").value;
      document.getElementById("results").innerHTML = resultsView(
        resultElements,
        searchTerm
      );
    }, 500)
    
  });
};

// window.addEventListener(`load`, (event) => {
//   document.getElementById("app").innerHTML = layout();
// });

function layout() {
  return `
  <div id="searchBox">
  <h1>Tražilica sveučilišta</h1>
    <div class="input-group input-group-lg mt-3 mb-3">
    <input id="search" type="text" class="form-control"  placeholder="Unesi ime države">
    </div>
    <div>
      <div class="spinner-container" id="spinner">
      <div class="loadingio-spinner-spin-f6d3kdtn6du"><div class="ldio-aswsg7m0sac">
      <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
      </div></div>
      </div>
      <div id="results"></div>
    </div>
  </div>
    
    `;
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

async function fetchData(searchTerm) {
  if(searchTerm.length == 0) {
    return undefined;
  }else {
    const result = await fetch(
      `http://universities.hipolabs.com/search?country=${searchTerm}`
    );
    return await result.json();
  }
  
}

function resultsView(rezultati, searchTerm) {
  if (rezultati.length == 0 || rezultati == undefined || rezultati == null) {
    return `<h2> Rezultati za upit ${searchTerm} ne postoje. Molim unijeti ponovno.</h2>`;
  } else {
    if (rezultati.length >= 10) {
     var html1 = `<h2> Rezultati za upit ${searchTerm}:</h2> <ul class="list-group list-group-flush">`;
     var html2 =  `</ul>`
      for (var i = 0; i <10; i++){
        html1 +=  `
         <li class="list-group-item">  <a href="${rezultati[i].web_pages[0]}">${rezultati[i].name}</a></li>
      `;
      }
      return html1 + html2;
    } else {
      return `
      <h2> Rezultati za upit ${searchTerm}:</h2>
      <ul class="list-group list-group-flush">
        ${rezultati
          .map((element) => {
            return `<li class="list-group-item">  <a href="${element.web_pages[0]}">${element.name}</a></li>`;
          })
          .join("")}
      </ul>
    `;
    }
   
  }
}
