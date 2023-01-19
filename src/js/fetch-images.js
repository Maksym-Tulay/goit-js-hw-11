import axios from 'axios';
export { fetchImages };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const AXIOS_KEY = '32913674-39cccb901e0de5e7baddaeb0d';

async function fetchImages(query, page, perPage) {
    const response = await axios.get(
        `?key=${AXIOS_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
    );
    return response;
}