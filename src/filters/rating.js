module.exports = (val) => {
  let text;

  switch (val) {
    case 1:
      text = '★';
      break;

    case 1.5:
      text = '★★½';
      break;

    case 2:
      text = '★★';
      break;

    case 2.5:
      text = '★★½';
      break;

    case 3:
      text = '★★★';
      break;

    case 3.5:
      text = '★★★½';
      break;

    case 4:
      text = '★★★★';
      break;

    case 4.5:
      text = '★★★★½';
      break;

    case 5:
      text = '★★★★★';
      break;
  }

  return text;
};
