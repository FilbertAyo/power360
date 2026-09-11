(function () {
  'use strict';

  var form = document.querySelector('.contact__form');
  var message = document.querySelector('.contact__msg');

  if (!form || !message) {
    return;
  }

  function showMessage(text, isError) {
    message.classList.toggle('alert-danger', isError);
    message.classList.toggle('alert-success', !isError);
    message.textContent = text;
    message.style.display = 'block';
    window.setTimeout(function () {
      message.style.display = 'none';
    }, 2000);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    fetch(form.getAttribute('action'), {
      method: 'POST',
      body: new FormData(form)
    })
      .then(function (response) {
        return response.text().then(function (text) {
          if (!response.ok) {
            throw new Error(text || 'Unable to send your message.');
          }
          showMessage(text || 'Your message was sent successfully.', false);
          form.reset();
        });
      })
      .catch(function (error) {
        showMessage(error.message || 'Unable to send your message.', true);
      });
  });
})();
