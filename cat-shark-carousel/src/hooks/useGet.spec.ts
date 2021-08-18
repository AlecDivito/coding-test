import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { renderHook, act } from '@testing-library/react-hooks'
import useGet from './useGet';
import { Endpoint, Urls } from '../util/url';
import PhotoType from '../types/photoType';


describe('useGet', () => {
    const sharkResponseData = [
        'https://founded.media/hiring/photos/sharks/11261840124_dc9ac72bbe_b.jpg',
        'https://founded.media/hiring/photos/sharks/513197047_2f861d56cb_b.jpg',
    ];

    const catResponseData = [
        'https://founded.media/hiring/photos/cats/14157413946_fea785b4d6_k.jpg',
        'https://founded.media/hiring/photos/cats/16175483119_bd7374d8a8_h.jpg',
    ]

    const allResponseData = [...sharkResponseData, ...catResponseData]

    const testErrorResponse = {
        error: "example error",
        message: "example error message"
    }

    const server = setupServer(
        rest.get(Urls[Endpoint.PHOTOS], (req, res, ctx) => {
            let { types, pleaseError } = req.params;
            if (pleaseError) {
                return res(ctx.status(400), ctx.json(testErrorResponse))
            }
            if (!Array.isArray(types) && types) {
                types = [types]
            } else {
                types = []
            }
            console.log(types);
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
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('should get list of cat photos from get request', async () => {
        const data = { endpoint: Endpoint.PHOTOS, params: { types: [PhotoType.CAT] } }
        const { result, waitForNextUpdate } = renderHook(() => useGet<string[], any>(data));

        expect(result.current[0].isLoading).toBeTruthy();

        await waitForNextUpdate();

        expect(result.current[0].isLoading).toBeFalsy();
        expect(result.current[0].errors).toBeUndefined();
        // expect(result.current[0].data).toStrictEqual(catResponseData);
    });

    it('should get and handle error from api', async () => {
        const data = { endpoint: Endpoint.PHOTOS, params: { types: [PhotoType.CAT], pleaseError: "true" } }
        const { result, waitForNextUpdate } = renderHook(() => useGet<string[], any>(data));

        expect(result.current[0].isLoading).toBeTruthy();

        await waitForNextUpdate();

        expect(result.current[0].isLoading).toBeFalsy();
        // expect(result.current[0].errors).toStrictEqual(testErrorResponse);
        // expect(result.current[0].data).toBeUndefined();
    });

    it('should redo get request when parameters change', async () => {
        const data = { endpoint: Endpoint.PHOTOS, params: { types: [PhotoType.SHARK] } }
        const { result, waitForNextUpdate } = renderHook(() => useGet<string[], any>(data));

        expect(result.current[0].isLoading).toBeTruthy();

        await waitForNextUpdate();

        expect(result.current[0].isLoading).toBeFalsy();
        expect(result.current[0].errors).toBeUndefined();
        // expect(result.current[0].data).toStrictEqual(sharkResponseData);

        act(() => {
            result.current[1]({ params: { types: [PhotoType.SHARK, PhotoType.CAT] } });
        })

        expect(result.current[0].isLoading).toBeTruthy();

        await waitForNextUpdate();

        expect(result.current[0].isLoading).toBeFalsy();
        expect(result.current[0].errors).toBeUndefined();
        // expect(result.current[0].data).toStrictEqual(allResponseData);
    });
});