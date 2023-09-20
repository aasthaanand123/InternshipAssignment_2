const input = document.querySelector("input");
const form = document.querySelector("form");
const word = document.querySelector("h2");
const meaning = document.querySelector(".meaningtext");
const dictWrapper = document.querySelector(".results_wrapper");
const meaningsWrapper = document.querySelector(".meanings_wrapper");
const clearIcon = document.querySelector(".clear-icon");
const audio = document.querySelector(".audio_results");
function setData(word) {
  if (word.length > 0) {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        input.value = "";
        setHeading(response.data[0]);
        setMeaning(response.data[0].meanings);
        if (dictWrapper.classList.contains("none")) {
          dictWrapper.classList.remove("none");
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }
}
setData("crystals");
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let word = input.value;
  setData(word);
});
// cross icon
clearIcon.addEventListener("click", function () {
  document.querySelector("input").value = "";
});

input.addEventListener("input", function () {
  if (input.value.trim() !== "") {
    clearIcon.style.display = "block";
  } else {
    clearIcon.style.display = "none";
  }
});

clearIcon.addEventListener("click", function () {
  input.value = "";
  clearIcon.style.display = "none";
});
