import React, { useState } from 'react';
import Button from '../components/button';
import Carousel, { IChange } from '../components/carousel';
import Loading from '../components/loading';
import useGet from '../hooks/useGet';
import PhotoType from '../types/photoType';
import { Endpoint } from '../util/url';

const Index = () => {
    const [state, updateState] = useState({ activeIndex: 0, photoTypes: [PhotoType.CAT, PhotoType.SHARK] })
    const [getState, updateParams] = useGet({ endpoint: Endpoint.PHOTOS, params: { types: state.photoTypes } })

    const toggle = (photoType: PhotoType) => {
        let photoTypes: PhotoType[] = [];
        if (state.photoTypes.includes(photoType)) {
            photoTypes = state.photoTypes.filter(value => value !== photoType)
        } else {
            photoTypes = [...state.photoTypes, ...[photoType]];
        }
        updateParams({ params: { types: photoTypes } });
        updateState({ photoTypes, activeIndex: 0 })
    };

    const updateIndex = (change: IChange) => {
        let activeIndex = state.activeIndex + change;
        if (activeIndex < 0) {
            activeIndex = getState.data.length - 1;
        } else if (activeIndex >= getState.data.length) {
            activeIndex = 0;
        }
        updateState(prev => ({ ...prev, ...{ activeIndex } }));
    };

    return (
        <main className="flex flex-columns h-100 align-center">
            <header className="flex align-center flex-columns">
                <h1>🐈 Pictures of Ferocious Beasts 🦈</h1>
                <h2>
                    The ultimate repository, currently showing
                    {state.photoTypes.length > 0 ? ` ${state.photoTypes[0].toLocaleLowerCase()}s ` : "nothing"}
                    {state.photoTypes.length > 1 ? ` and ${state.photoTypes[1].toLocaleLowerCase()}s` : ""}
                </h2>
            </header>
            <section className="flex mb-2">
                <Button active={state.photoTypes.includes(PhotoType.CAT)}
                    onClick={() => toggle(PhotoType.CAT)}
                >
                    🐈 Cats
                </Button>
                <Button active={state.photoTypes.includes(PhotoType.SHARK)}
                    onClick={() => toggle(PhotoType.SHARK)}
                >
                    🦈 Sharks
                </Button>
            </section>
            <Loading isLoading={getState.isLoading}>
                <Carousel
                    activeIndex={state.activeIndex}
                    images={getState.isLoading ? [] : getState.data}
                    onCarousel={updateIndex}
                    onJump={(activeIndex) => updateState({ ...state, ...{ activeIndex } })}
                />
            </Loading>
        </main>
    );
}

export default Index;
