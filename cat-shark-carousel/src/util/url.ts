import { ParamValues } from "../hooks/useGet";

enum Endpoint {
    PHOTOS
}

const api = "http://localhost:3000";
const Urls = {
    [Endpoint.PHOTOS]: `${api}/photos`
};

const buildEndpoint = (url: Endpoint, params?: ParamValues): string => {
    const connectedParams = [];
    for (let key in params) {
        if (!params.hasOwnProperty(key) || (typeof params[key] !== "boolean" && !params[key])) {
            continue;
        }
        if (Array.isArray(params[key]) && params[key].length !== undefined) {
            const array = params[key] as string[];
            array.forEach(value => connectedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`));
        } else {
            const value = params[key] as string;
            connectedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
    }
    return `${Urls[url]}?${connectedParams.join("&")}`;
}

export {
    Urls,
    Endpoint,
    buildEndpoint
};