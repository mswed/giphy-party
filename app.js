const api_key = 'bHvU9ATgW0XdgCT2v8k0wJ6GD1c2pQG9'
async function searchGiphy(q, limit){
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {params: {api_key, q, limit}});
    // console.log('--->', res.data.data)
    attachImages(res.data.data)
}

function attachImages(images) {
    foundImages.innerHTML = ''
    clear.classList.remove('disabled')
    for(let image of images) {
        console.log(image.images.original.url)
        console.log(image.title)
        console.log(image.alt_text)

        const card = document.createElement('div')
        card.classList.add('card')
        card.classList.add('col-2')
        card.classList.add('mx-2')
        card.classList.add('py-1')
        card.classList.add('shadow')

        const img = document.createElement('img')

        img.src = image.images.original.url
        img.alt = `Image of: ${image.alt_text}`
        img.classList.add('card-img-top')

        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        const p = document.createElement('p')
        p.innerText = image.title
        p.classList.add('card-text')

        card.append(img)
        card.append(cardBody)
        cardBody.append(p)
        foundImages.append(card)
    }
}
const submit = document.querySelector('#submit')
const input = document.querySelector('#search-term')
const foundImages = document.querySelector('#found-images')
const clear = document.querySelector('#clear')

submit.addEventListener('click', (e)=> {
    searchGiphy(input.value, 5)
})