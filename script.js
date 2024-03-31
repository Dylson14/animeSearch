document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get the search query from the input field
    var searchQuery = document.getElementById("searchQuery").value.trim();

    // Construct URL for fetching data from the TV Maze API
    //   var apiUrl = `https://api.tvmaze.com/search/shows?q=${searchQuery}`;

    const apiUrl = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${searchQuery}&sortBy=ranking&sortOrder=asc`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "970d284f05msh51e21f78bd2ad88p1c0707jsnc155602fbc97",
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    };

    // Fetch data from the TV Maze API
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        // Clear previous search results
        document.getElementById("searchResults").innerHTML = "";
        // var parsedData = JSON.parse(data)
        console.log(data.data);
        // Display search results
        data.data.forEach((result) => {
          var showElement = document.createElement("div");
          showElement.innerHTML = `<h2>${result.title}</h2>
                                                 <p>${result.synopsis}</p>
                                                 <img src='${result.image}' alt='${result.title}'>`;
          document.getElementById("searchResults").appendChild(showElement);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
