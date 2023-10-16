console.log("Let's get this party started!");

const api_key = 'bHvU9ATgW0XdgCT2v8k0wJ6GD1c2pQG9'
async function searchGiphy(q){
    console.log(q)
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {params: {api_key, q}})
    console.log(res)
}