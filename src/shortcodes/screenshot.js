// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (content, path, alt, direction) => {
  img = `<img src="${path}" alt="${alt}" loading="lazy" />`;
  directionLabel = `&uarr; Above`;

  if (isProduction) {
    img = `<img src="https://res.cloudinary.com/smithtimmytim/image/fetch/w_480,f_auto,q_auto/https://smithtimmytim.com${path}" srcset="https://res.cloudinary.com/smithtimmytim/image/fetch/w_480,f_auto,q_auto/https://smithtimmytim.com${path} 480w, https://res.cloudinary.com/smithtimmytim/image/fetch/w_1000,f_auto,q_auto/https://smithtimmytim.com${path} 1000w, https://res.cloudinary.com/smithtimmytim/image/fetch/w_1800,f_auto,q_auto/https://smithtimmytim.com${path} 1800w" alt="${alt}" loading="lazy"/>`;
  }

  if (direction === 'top') {
    let directionLabel = `&darr; Below`;
    return `<figure class="[ screenshot ] [ image-bleed ]">
  <div class="wrapper">
    <div class="inner-wrapper">
      <figcaption class="image__caption" data-variant="top">
        <p><span class="color-tertiary">${directionLabel}: </span>${content}</p>
      </figcaption>
    </div>
  </div>
  <div class="screenshot__container">
    ${img}
  </div>
</figure>`;
  } else {
    return `<figure class="[ screenshot ] [ image-bleed ]">
  <div class="screenshot__container">
    ${img}
  </div>
  <div class="wrapper">
    <div class="inner-wrapper">
      <figcaption class="image__caption">
        <p><span class="color-tertiary">${directionLabel}: </span>${content}</p>
      </figcaption>
    </div>
  </div>
</figure>`;
  }
};
