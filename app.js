const placeForTitle = document.querySelector(".response-title");
const placeForLyrics = document.querySelector(".response-lyrics");
const button = document.querySelector(".form");

const changeInputFirstChars = (inputWord) => {
    return inputWord
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const changeNewlinesToBreaks = (stringToChange) => {
  for (i = 0; i < stringToChange.length; i++) { 
    stringToChange = stringToChange.replace(new RegExp(/\\n/g), "<br/>");
  }
  return stringToChange;
}

const searchLyrics = (event) => {
  event.preventDefault();
  
  const inputArtist = changeInputFirstChars(document.getElementsByName("artist")[0].value);
  const inputTitle = changeInputFirstChars(document.getElementsByName("title")[0].value);

  fetch ("https://api.lyrics.ovh/v1/" + inputArtist + "/" + inputTitle)
    .then(result => {
      return result.json();
    })
    .then(data => {
      const finalLyrics = changeNewlinesToBreaks(JSON.stringify(data.lyrics));    
      placeForLyrics.innerHTML = finalLyrics;
      placeForTitle.innerHTML = inputArtist + " - '" + inputTitle + "' ";
    })
    .catch(error => {
      alert("No such lyrics, please try once more!");
    });
}

button.addEventListener("submit", searchLyrics);