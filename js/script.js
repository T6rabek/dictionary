//VARIABLES GLOBAL
const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

//DEFINITION SHOWING FUNCTION
async function showDefinition() {
  const resultContainer = document.querySelector('.result-container');
  resultContainer.style.display = 'block';
  const searchedWord = document.querySelector('.searched-word').value;
  const response = await fetch(apiUrl + `${searchedWord}`);

  if (response.status === 404) {
    window.alert('There is no such word in English');
  } else {
    let data = await response.json();
    let audioBtn = document.querySelector('#audio-btn');

    // TYPE OF WORD
    document.querySelector('#searched-word-text').innerHTML = data[0].word;
    document.querySelector('.pronunciation-text .type').innerHTML =
      data[0].meanings[0].partOfSpeech;

    // PRONUNCIATION TEXT
    if (data[0].phonetic) {
      document.querySelector('.pronunciation-text .pron').innerHTML =
        data[0].phonetic;
    } else {
      document.querySelector('.pronunciation-text .pron').innerHTML =
        data[0].phonetics[1].text;
    }

    // MEANING
    document.querySelector('.meaning').innerHTML =
      data[0].meanings[0].definitions[0].definition;

    // EXAMPLES
    let exampleText = '';
    if (data[0].meanings && data[0].meanings[0].definitions) {
      const firstExample = data[0].meanings[0].definitions.find(
        def => def.example
      );
      if (firstExample) {
        exampleText = `<p>${firstExample.example}</p>`;
      } else {
        exampleText = 'There is no example for this word';
      }
    }

    document.querySelector('.example #example').innerHTML = exampleText;

    // PRONUNCIATION AUDIO
    let audio = document.querySelector('#audio');
    let pronunciationAudio;

    if (data[0].phonetics) {
      for (const phonetic of data[0].phonetics) {
        if (phonetic.audio) {
          pronunciationAudio = phonetic.audio;
          break;
        }
      }
    }

    if (pronunciationAudio) {
      audio.src = pronunciationAudio;
    }

    audioBtn.addEventListener('click', () => {
      audio.play();
    });
  }
}

// CALLING FUNCTIONS
document.querySelector('.search-btn').addEventListener('click', showDefinition);

document.querySelector('.searched-word').addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    showDefinition();
  }
});
