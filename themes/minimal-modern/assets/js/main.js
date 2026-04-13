document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  var publicationEntries = document.querySelectorAll('.pub-entry');

  if (!toggle || !links) {
    // Keep touch feedback available even if the nav is absent.
    publicationEntries.forEach(function (entry) {
      bindPublicationEntryState(entry);
    });
    return;
  }

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('nav__links--open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('nav__links--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  publicationEntries.forEach(function (entry) {
    bindPublicationEntryState(entry);
  });
});

function bindPublicationEntryState(entry) {
  entry.addEventListener('pointerdown', function (event) {
    if (event.pointerType === 'mouse') {
      return;
    }

    entry.classList.add('pub-entry--pressed');
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (eventName) {
    entry.addEventListener(eventName, function () {
      entry.classList.remove('pub-entry--pressed');
    });
  });
}
