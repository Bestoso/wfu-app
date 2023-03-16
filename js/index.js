const toggler = document.querySelector('.menu__toggler');
const menu = document.querySelector('.menu')
const container = document.querySelector('.images__container');
const filtersSection = document.querySelector('.filters__section');

let images = [];
const imageKeeper = [];

const urlStructure = 'https://api.waifu.im/search/?included_tags=hentai&ero&ass&milf&ecchi&paizuri&oral&many=true';

const hentaiCategories = [
    {name: 'hentai', query: '&hentai'},
    {name: 'ass', query: '&ass'},
    {name: 'oral', query: '&oral'},
    {name: 'milf', query: '&milf'},
    {name: 'ecchi', query: '&ecchi'},
    {name: 'paizuri', query: '&paizuri'},
    {name: 'ero', query: '&ero'},
    {name: '.gif', query: '&gif'}
];

const renderButtons = () => {
    hentaiCategories.forEach((btn) => {
      const button = document.createElement('button');
      button.className = 'filter__btn';
      button.innerHTML = `${btn.name}`;
      filtersSection.appendChild(button);
  });
};

function flatImagesArray() {
  imageKeeper.length = 0; // clear the array
  images.forEach((image) => imageKeeper.push(...image.images));
  return imageKeeper.flat();
}

const handleTogglers = () => {
  toggler.classList.toggle('active');
  menu.classList.toggle('active');
}

toggler.addEventListener('click', handleTogglers);

const fetchImages = async (url = urlStructure ) => {
  const response = await fetch(url)
  const { images: imageList } = await response.json();
  imageKeeper.push(...imageList);
}

const getManyImages = async (requestLimit = 5) => {
  const promises = [];
  for (let i = 0; i < requestLimit; i++) {
    promises.push(fetchImages());
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  return Promise.all(promises);
}

function renderImages(imagesArray) {
    imagesArray.map((image) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'image__card';
        imageCard.innerHTML = `
            <img src="${image.url}" alt="waifu image" class="image" />
            <div class="image__card__info">
                <a href=${image.source} target="_blank"> Go to image </a>
            </div>
        `;
        container.appendChild(imageCard);
        });
}

function filterByCategories (category) {
    const filteredImages = imageKeeper.filter((image) => image.tags.forEach((tag) => tag.name.includes(categor)));
    // container.innerHTML = '';
    // renderImages(filteredImages);
}

renderButtons();
getManyImages(30)
    .then(() => {
        images = imageKeeper;
        console.log(images);
        renderImages(images);
    }
);