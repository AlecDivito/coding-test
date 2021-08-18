import { rest } from "msw";
import PhotoType from "./types/photoType";
import { Endpoint, Urls } from "./util/url";

export const sharkResponseData = [
    'https://founded.media/hiring/photos/sharks/11261840124_dc9ac72bbe_b.jpg',
    'https://founded.media/hiring/photos/sharks/513197047_2f861d56cb_b.jpg',
];

export const catResponseData = [
    'https://founded.media/hiring/photos/cats/14157413946_fea785b4d6_k.jpg',
    'https://founded.media/hiring/photos/cats/16175483119_bd7374d8a8_h.jpg',
]

export const allResponseData = [...sharkResponseData, ...catResponseData]

export const testErrorResponse = {
    error: "example error",
    message: "example error message"
}

export const handlers = [
    rest.get(Urls[Endpoint.PHOTOS], (req, res, ctx) => {
        let types = req.url.searchParams.getAll('types')
        let pleaseError = req.url.searchParams.get('pleaseError');
        if (pleaseError) {
            return res(ctx.status(400), ctx.json(testErrorResponse))
        }
        if (!types) {
            types = []
        }
        if (types.includes(PhotoType.CAT) && types.includes(PhotoType.SHARK)) {
            return res(ctx.json(allResponseData));
        } else if (types.includes(PhotoType.CAT)) {
            return res(ctx.json(catResponseData))
        } else if (types.includes(PhotoType.SHARK)) {
            return res(ctx.json(sharkResponseData))
        } else {
            return res(ctx.json([]))
        }
    }),
]