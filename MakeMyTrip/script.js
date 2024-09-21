// Add functionality to the search button
document
  .querySelector(".search-bar button")
  .addEventListener("click", function () {
    const destination = document.querySelector(".search-bar input").value;
    if (destination) {
      alert("Searching for trips to " + destination + "...");
    } else {
      alert("Please enter a destination.");
    }
  });
