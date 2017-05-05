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
        <a
          data-id=${question.id}
          href
          class="question-link">
            ${question.title}
        </a>
      </div>
    `
  }).join('');
}

function renderQuestion(question) {
  return `
    <button class="back">Back</button>
    <h1>${question.title}</h1>
    <p>${question.body}</p>
  `
}

document.addEventListener('DOMContentLoaded', function() {
  // We put our DOM queries inside a DOMContentLoaded event handler because the
  // queried nodes are likely not rendered yet. Javascript inside of a
  // DOMContentLoaded event handler will run once every HTML tag has been
  // rendered by the browser.
  const questionsList = document.querySelector('#questions-list');
  const questionDetails = document.querySelector('#question-details');

  getQuestions()
    .then(renderQuestions)
    .then(function(html) { questionsList.innerHTML = html })

  questionsList.addEventListener('click', function(event) {
    const { target } = event;

    if (target.matches('.question-link')) {
      event.preventDefault();
      const questionId = target.getAttribute('data-id');


      getQuestion(questionId)
        .then(function(question) {
          questionDetails.innerHTML = renderQuestion(question);
          questionDetails.classList.remove('hidden');
          questionsList.classList.add('hidden');
        });
    }

  });

  questionDetails.addEventListener('click', function(event) {
    const { target } = event;

    if (target.matches('button.back')) {
      questionDetails.classList.add('hidden');
      questionsList.classList.remove('hidden');
    }
  });
});
