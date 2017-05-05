const DOMAIN = 'http://localhost:3000';
const API_TOKEN = 'IKSUSi1n_gvztP2zyFM4OQlOh-3R5E_zsgUPxH1oMIA';

// getQuestions makes a request to our Rails API backend and returns an array
// of questions in a promise.
function getQuestions() {
  return fetch(`${DOMAIN}/api/v1/questions?api_token=${API_TOKEN}`)
    .then(function(res) { return res.json() })
}

// getQuestions makes a request to our Rails API backend and returns a single
// questions object in a promise of the given id.
function getQuestion(id) {
  return fetch(`${DOMAIN}/api/v1/questions/${id}?api_token=${API_TOKEN}`)
    .then(function(res) { return res.json() })
}

function renderQuestions(questions) {
  return questions.map(function(question) {
    return `
      <div class="question-summary">
        ${question.title}
      </div>
      <hr>
    `
  }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
  // We put our DOM queries inside a DOMContentLoaded event handler because the
  // queried nodes are likely not rendered yet. Javascript inside of a
  // DOMContentLoaded event handler will run once every HTML tag has been
  // rendered by the browser.
  const questionsList = document.querySelector('#questions-list');

  getQuestions()
    .then(renderQuestions)
    .then(function(html) { questionsList.innerHTML = html })
})
