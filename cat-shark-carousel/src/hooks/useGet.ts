import { useReducer, useEffect } from "react"
import { buildEndpoint, Endpoint } from "../util/url";

export type ParamValue = string | string[];
export type ParamValues = { [key: string]: ParamValue };

interface IProps {
    endpoint?: Endpoint;
    params?: ParamValues;
}

interface IState<T = any, P = any> {
    isLoading: boolean;
    data?: T;
    errors?: P;
}

const initialState: IState = {
    isLoading: true,
    data: undefined,
    errors: undefined,
}

function reducer(state: IState, action: Partial<IState>): IState {
    return { ...state, ...action }
}

function paramsReducer(state: IProps, action: Partial<IProps>): IProps {
    return { ...state, ...action }
}

function useGet<T = any, P = any>(props: IProps): [IState<T, P>, (action: Partial<IProps>) => void] {
    const [parameters, updateParameters] = useReducer(paramsReducer, props);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (parameters.endpoint === undefined) {
            return;
        }
        const abortController = new AbortController();
        const fetchData = async () => {
            dispatch({ isLoading: true });
            try {
                const generatedUrl = buildEndpoint(parameters.endpoint!, parameters.params);
                const response = await fetch(generatedUrl, { method: 'GET', signal: abortController.signal });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(JSON.stringify(data))
                }
                // Normally this set timeout would not exist here, but i've included
                // it so that when running locally, you'll actually be able to
                // see the loading icon. uncomment the line below to use the code
                // that would normally be here.
                setTimeout(() => dispatch({ data, isLoading: false }), 500);
                // dispatch({ data, isLoading: false })
            } catch (errors) {
                if (!abortController.signal.aborted) {
                    dispatch({ errors: JSON.parse(errors.message), isLoading: false });
                }
            }
        };
        fetchData();
        return () => { abortController.abort(); }
    }, [parameters]);

    return [state, updateParameters];
}

export default useGet;