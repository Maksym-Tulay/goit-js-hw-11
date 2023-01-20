import axios from 'axios';
export { fetchImages };

async function fetchImages(query, page, perPage) {
    const baseUrl = 'https://pixabay.com/api/';
    const KEY = '32913674-39cccb901e0de5e7baddaeb0d';
    const filter = `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    const response = await axios.get((`${baseUrl}${filter}`));
    return response;
}