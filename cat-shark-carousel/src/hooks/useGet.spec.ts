import React from 'react';
import { setupServer } from 'msw/node'
import { renderHook, act } from '@testing-library/react-hooks'
import useGet from './useGet';
import { Endpoint } from '../util/url';
import PhotoType from '../types/photoType';
import { allResponseData, catResponseData, handlers, sharkResponseData, testErrorResponse } from '../testHandlers';


const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should get list of cat photos from get request', async () => {
    const data = { endpoint: Endpoint.PHOTOS, params: { types: [PhotoType.CAT] } }
    const { result, waitForNextUpdate } = renderHook(() => useGet<string[], any>(data));

    expect(result.current[0].isLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current[0].isLoading).toBeFalsy();
    expect(result.current[0].errors).toBeUndefined();
    expect(result.current[0].data).toStrictEqual(catResponseData);
});

test('should get and handle error from api', async () => {
    const data = { endpoint: Endpoint.PHOTOS, params: { types: [PhotoType.CAT], pleaseError: "true" } }
    const { result, waitForNextUpdate } = renderHook(() => useGet<string[], any>(data));

    expect(result.current[0].isLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current[0].isLoading).toBeFalsy();
    expect(result.current[0].errors).toStrictEqual(testErrorResponse);
    expect(result.current[0].data).toBeUndefined();
});

test('should redo get request when parameters change', async () => {
    const data = { endpoint: Endpoint.PHOTOS, params: { types: [PhotoType.SHARK] } }
    const { result, waitForNextUpdate } = renderHook(() => useGet<string[], any>(data));

    expect(result.current[0].isLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current[0].isLoading).toBeFalsy();
    expect(result.current[0].errors).toBeUndefined();
    expect(result.current[0].data).toStrictEqual(sharkResponseData);

    act(() => {
        result.current[1]({ params: { types: [PhotoType.SHARK, PhotoType.CAT] } });
    })

    expect(result.current[0].isLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current[0].isLoading).toBeFalsy();
    expect(result.current[0].errors).toBeUndefined();
    expect(result.current[0].data).toStrictEqual(allResponseData);
});
