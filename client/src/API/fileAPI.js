import {hostAPI, hostAPIfiles, hostSecureAPI} from './rootAPI';
import {formatDateToDateTimeShort} from "../utils/commonMethods";

const fileApiRoutes = {
    getFolderContent: {method: 'get', path: 'files/contents/'},
    removeFile: {method: 'delete', path: 'files/'},
    getFileInfo: {method: 'get', path: 'files/%1/info'},
    openFile: {method: 'get', path: 'files/'}
}

export const getFolderContent = async (id, offset = 0, limit = 10) => {
    const path = fileApiRoutes.getFolderContent.path + `${id}?offset=${offset}&limit=${limit}`;
    const {data} = await hostSecureAPI.get(path);

    data.rows.forEach(file => {
        file.createdAt = formatDateToDateTimeShort(file.createdAt);
        file.updatedAt = formatDateToDateTimeShort(file.updatedAt);
    })

    return data;
}

export const getFileInfo = async (id) => {
    const path = fileApiRoutes.getFileInfo.path.replace('%1', id);
    const {data} = await hostAPI[fileApiRoutes.getFileInfo.method](path);

    data.createdAt = formatDateToDateTimeShort(data.createdAt);
    data.updatedAt = formatDateToDateTimeShort(data.updatedAt);
    return data;
}

export const removeFile = async (id) => {
    const path = fileApiRoutes.removeFile.path + id;
    const {data} = await hostSecureAPI.delete(path);

    console.log(data);
    return data;
}

export const openFile = async (id, name) => {
    const path = fileApiRoutes.openFile.path + id;
    const response = await hostAPIfiles.get(path);

    const href = window.URL.createObjectURL(response.data);
    const anchorElement = document.createElement('a');

    anchorElement.href = href;
    anchorElement.download = name;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);

    return response;
}