module.exports = (id) => {
  return `<figure class="video">
    <div class="video-container"><iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/${id}"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe></div>
  </figure>`;
};
