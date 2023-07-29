import React from 'react';
import {Pagination} from "react-bootstrap";
import {usePagination} from "../hooks/usePagination";


const PaginationST = ({totalPages, page, changePage}) => {
    const pagesArray = usePagination(totalPages);
    return (
        <Pagination>
            {pagesArray.map(p =>
                <Pagination.Item
                    key={p}
                    onClick={() => changePage(p)}
                    active={p === page}
                >
                    {p}
                </Pagination.Item>
            )}
        </Pagination>
    );
};

export default PaginationST;