export const formatDate = (date_str, opts) => {

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        ...opts
    };

    const locale = process.env.REACT_APP_DEFAULT_LOCALE;
    return new Intl.DateTimeFormat(locale, options).format(new Date(date_str));
}

export const formatDateToDateTimeFull = (date_str) => {
    return formatDate(date_str, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    })
}

export const formatDateToDateTimeShort = (date_str) => {
    return formatDate(date_str, {
        hour: "numeric",
        minute: "numeric"
    })
}

export const formatDateToDateOnly = (date_str) => {
    return formatDate(date_str, {})
}

export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
}

export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1);
    }
    console.log('-----Посчитались страницы-----------------')
    return result;
}