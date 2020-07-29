const isProduction = process.env.NODE_ENV === 'production';

module.exports = (path, alt, variant, caption) => {
  const VARIANTS = [
    'reg',
    'full-bleed',
    'left',
    'right',
    'extend-out',
    'small-right',
  ];

  if (!VARIANTS.includes(variant)) {
    throw new Error(
      `${variant} is not supported. Try [${VARIANTS.join(', ')}]`
    );
  }

  img = `<img src="${path}" alt="${alt}" loading="lazy" />`;

  if (isProduction) {
    img = `<img src="https://res.cloudinary.com/smithtimmytim/image/fetch/w_480,f_auto,q_auto/https://smithtimmytim.com${path}" srcset="https://res.cloudinary.com/smithtimmytim/image/fetch/w_480,f_auto,q_auto/https://smithtimmytim.com${path} 480w, https://res.cloudinary.com/smithtimmytim/image/fetch/w_1000,f_auto,q_auto/https://smithtimmytim.com${path} 1000w, https://res.cloudinary.com/smithtimmytim/image/fetch/w_1800,f_auto,q_auto/https://smithtimmytim.com${path} 1800w" alt="${alt}" loading="lazy"/>`;
  }

  let captionText = caption
    ? `<figcaption class="image__caption"><p>${caption}</p></figcaption>`
    : '';

  const imageMarkup = `<figure class="post-image" data-variant="${variant}">${img}${captionText}</figure>`;

  return imageMarkup;
};
