(function () {
  var screen = document.getElementById('reelScreen');
  if (!screen) return;

  var DURATIONS = [5000, 5500, 5500, 5000, 5000];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var imgs = Array.prototype.slice.call(screen.querySelectorAll('img'));
  var dotsRow = document.getElementById('reelDots');
  var prevBtn = document.getElementById('reelPrev');
  var nextBtn = document.getElementById('reelNext');

  imgs.forEach(function (_, i) {
    var d = document.createElement('button');
    d.type = 'button';
    d.className = 'reel-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Screen ' + (i + 1));
    d.dataset.goto = i;
    dotsRow.appendChild(d);
  });
  var dots = Array.prototype.slice.call(dotsRow.querySelectorAll('.reel-dot'));

  var current = 0;
  var timer = null;

  function goTo(i) {
    current = (i + imgs.length) % imgs.length;
    imgs.forEach(function (im) { im.classList.toggle('on', Number(im.dataset.i) === current); });
    dots.forEach(function (d, idx) { d.classList.toggle('active', idx === current); });
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (reduceMotion) return;
    timer = setTimeout(function () { goTo(current + 1); }, DURATIONS[current]);
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });
  dots.forEach(function (d) {
    d.addEventListener('click', function () { goTo(Number(d.dataset.goto)); });
  });

  goTo(0);
})();
