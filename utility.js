function setHeading(data) {
  word.innerHTML = "";
  meaning.innerHTML = "";
  audio.innerHTML = "";
  word.innerText = data.word;
  if (data.phonetic) {
    meaning.innerText = data.phonetic;
  }
  if (data.phonetics && data.phonetics[0].audio) {
    setAudio(data.phonetics[0].audio);
  }
}

function setExample(definition, new_definition) {
  if (definition.example) {
    new_definition.innerHTML += `<p class="examples">${definition.example}</p>`;
  }
}
function setSynonym(definition, new_definition) {
  if (definition.synonyms) {
    let synonymContainer = document.createElement("div");
    synonymContainer.classList.add("synonyms");
    let synonyms = definition.synonyms.join(",");
    synonymContainer.innerHTML += synonyms;
    new_definition.appendChild(synonymContainer);
  }
}
function setAudio(audiosrc) {
  audio.innerHTML = `<audio controls>
    <source src="${audiosrc}" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio>
  `;
}
function setMeaning(data) {
  meaningsWrapper.innerHTML = "";
  data.forEach((element) => {
    let new_container = document.createElement("div");
    new_container.classList.add("meanings");
    new_container.innerHTML = `
          <h3>${element.partOfSpeech}</h3>`;

    if (element.definitions) {
      let definitionsWrapper = document.createElement("div");
      let index = 1;
      element.definitions.forEach((definition) => {
        let new_definition = document.createElement("div");
        new_definition.style.marginBottom = "20px";
        new_definition.innerHTML = `
              <p class="definition">${index}. ${definition.definition}</p>`;
        setExample(definition, new_definition, data.word);
        setSynonym(definition, new_definition);
        definitionsWrapper.appendChild(new_definition);
        index += 1;
      });
      new_container.appendChild(definitionsWrapper);
    }
    meaningsWrapper.appendChild(new_container);
  });
}
