import React from 'react';
import { buildEndpoint, Endpoint, Urls } from './url';

describe('Build Endpoint', () => {
    it('should build a simple URL', () => {
        const url = buildEndpoint(Endpoint.PHOTOS, {});
        expect(url).toStrictEqual(`${Urls[Endpoint.PHOTOS]}?`)
    });

    it('should include parameter', () => {
        const url = buildEndpoint(Endpoint.PHOTOS, { example: 'parameter' });
        expect(url).toStrictEqual(`${Urls[Endpoint.PHOTOS]}?example=parameter`)
    });

    it('should handle parameter of type array', () => {
        const url = buildEndpoint(Endpoint.PHOTOS, { example: ['1', '2'] });
        expect(url).toStrictEqual(`${Urls[Endpoint.PHOTOS]}?example=1&example=2`)
    });
})