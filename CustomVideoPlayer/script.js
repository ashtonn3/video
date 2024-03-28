const video = document.querySelector('.video'),
      progress = document.querySelector('.progress'),
      progressBar = document.querySelector('.progress-filled'),
      toggle = document.querySelector('.toggle'),
      skipButtons = document.querySelectorAll('[data-skip]'),
      ranges = document.querySelectorAll('.slider');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(button => button.addEventListener('click', function () {
  video.currentTime += parseFloat(this.dataset.skip);
}));

function handleRangeUpdate() {
  video[this.name] = this.value;
}
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

video.addEventListener('timeupdate', function () {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
});

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);