const inputVal = document.getElementById("nameinput");

const unallowedChars = ["{", "}", ":", ","];
inputVal.addEventListener("keypress", event => {
  if (unallowedChars.includes(event.key)) {
    event.preventDefault();
  }
  // Check if Enter key is pressed
  if (event.key === "Enter") {
    event.preventDefault();
    eternalize();
  }
});

function eternalize() {
    console.log(inputVal.value);
    if(inputVal.value) {
      let link = "pay.html?name=" + inputVal.value
      window.location.href = link;
      return
    }

    alert('Please enter a name.');
  }