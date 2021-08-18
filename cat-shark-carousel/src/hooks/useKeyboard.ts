import { useEffect } from "react";

type IProps = (event: KeyboardEvent) => void;

function useKeyboard(props: IProps) {
    useEffect(() => {
        window.addEventListener('keyup', props);
        return () => {
            window.removeEventListener('keyup', props);
        }
    }, [props])
}

export default useKeyboard;