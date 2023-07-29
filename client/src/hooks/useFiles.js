import {useMemo} from "react";

export const useSortedFiles = (files, sortBy) => {
    const sortedFiles = useMemo(() => {
        if (sortBy) {
            return [...files].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        }
        return files;
    }, [sortBy, files]);

    return sortedFiles;
}

export const useFiles = (files, sortBy, query) => {
    const sortedFiles = useSortedFiles(files, sortBy);

    const sortedAndFilteredFiles = useMemo(() => {
        return sortedFiles.filter(file => file.name.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedFiles]);

    return sortedAndFilteredFiles;
}