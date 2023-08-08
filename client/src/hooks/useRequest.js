import {useState} from "react";

export const useRequest = (cb) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [error, setError] = useState('');

    const filing = async (...args) => {
        try {
            setIsDisabled(true);
            await cb(...args);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsDisabled(false);
        }
    }

    return [filing, isDisabled, error, setError];
}