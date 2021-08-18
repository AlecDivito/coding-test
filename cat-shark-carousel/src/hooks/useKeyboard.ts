import { useEffect } from "react";

type IProps = (event: KeyboardEvent) => void;

function useKeyboard(props: IProps) {
    useEffect(() => {
        console.log('register')
        window.addEventListener('keyup', props);
        return () => {
            console.log('unregister')
            window.removeEventListener('keyup', props);
        }
    }, [props])
}

export default useKeyboard;