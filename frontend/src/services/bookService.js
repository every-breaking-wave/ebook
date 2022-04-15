import config from 'config';
import {postRequest, postRequest_v2} from "../utils/ajax";
import {listBrand} from "../components/Brand";

// export const getBooks = (data, callback) => {
//     const url = `${config.apiUrl}/getBooks`;
//     postRequest(url, data, callback);
// };

export const getBook = (data, callback) => {
    for(let i = 0; i < listBrand.length; i ++){
        if(data === listBrand[i].id){
            callback = listBrand[i];
            break;
        }
    }
};

// export const getBook = (id, callback) => {
//     const data = {id: id};
//     const url = `${config.apiUrl}/getBook`;
//     postRequest_v2(url, data, callback);
//
// };
