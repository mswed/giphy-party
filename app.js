const submit = document.querySelector('#submit');
const input = document.querySelector('#search-term');
const foundImages = document.querySelector('#found-images');
const clear = document.querySelector('#clear');
const selectRandom = document.querySelector('#random')
const savedImagesContainer = document.querySelector('#saved-container');
const savedImages = document.querySelector('#saved-images');
const clearSaved = document.querySelector('#clear-saved');
const nextBtn = document.querySelector('#next')
const previousBtn = document.querySelector('#previous')
let latestSearch = '';
let offset = 0;

const api_key = 'bHvU9ATgW0XdgCT2v8k0wJ6GD1c2pQG9'
async function searchGiphy(q, limit, offset){
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {params: {api_key, q, limit, offset}});
    if(res.data.data.length > 0) {
        attachImages(res.data.data)

    } else {
        clearSearch()
    }
}

async function addRandom(q) {
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {params: {api_key, q}});
    const images = res.data.data;
    const randomImageIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomImageIndex]
    saveImage(selectedImage.images.original.url, `Image of: ${selectedImage.alt_text}`)



}
function attachImages(images) {
    foundImages.innerHTML = ''
    clear.classList.remove('disabled')
    selectRandom.classList.remove('disabled')
    for(let image of images) {
        const card = document.createElement('div');
        card.classList.add('card', 'col-2', 'mx-2', 'py-1', 'shadow');
        const img = document.createElement('img');
        img.src = image.images.original.url;
        img.alt = `Image of: ${image.alt_text}`;
        img.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const p = document.createElement('p');
        p.innerText = image.title;
        p.classList.add('card-text');

        card.append(img);
        card.append(cardBody);
        cardBody.append(p);
        foundImages.append(card);

        card.addEventListener('click', (e) => {
            const card = e.currentTarget;
            source = card.firstChild.src;
            alt = `Image of: ${card.firstChild.alt}`;
            saveImage(source, alt)
        })
    }
}

function saveImage(source, alt) {
    savedImagesContainer.classList.remove('d-none');
    const img = document.createElement('img');
    img.classList.add('m-2');
    img.src = source;
    img.alt = `Image of: ${alt}`;
    savedImages.append(img);
}

// Event listeners
submit.addEventListener('click', (e)=> {
    e.preventDefault();
    searchGiphy(input.value, 5, offset);
    latestSearch = input.value;
    input.value = '';
})

function clearSearch() {
    foundImages.innerHTML = '<h1 class="display-1 text-center p-5 text-secondary">NO IMAGES FOUND</h1>';
    clear.classList.add('disabled');
    selectRandom.classList.add('disabled');
}
clear.addEventListener('click', (e) => {
    clearSearch()
})

clearSaved.addEventListener('click', (ev) => {
    savedImages.innerHTML = '';
    savedImagesContainer.classList.add('d-none');

})

selectRandom.addEventListener('click', (ev) => {
    addRandom(latestSearch)
})

nextBtn.addEventListener('click', (ev) => {
    if (offset < 45) {
        offset += 5;
        searchGiphy(latestSearch, 5, offset)
    }
})

previousBtn.addEventListener('click', (ev) => {
    if (offset >= 5) {
        offset -= 5;
        searchGiphy(latestSearch, 5, offset)
    }
})