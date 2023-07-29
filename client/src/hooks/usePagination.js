import {useMemo} from "react";

export const usePagination = (totalPages) => {
    return useMemo(() => {
        let result = [];
        for (let i = 0; i < totalPages; i++) {
            result.push(i + 1);
        }
        console.log('Вычисление массива страниц');
        return result;
    }, [totalPages]);
}