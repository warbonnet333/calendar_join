// форматує "Wed Aug 04 2021 12:53:00 GMT+0300 (Eastern European Summer Time)" в обєкт дати "2021-07-03  "
export const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? ('0' + month) : month;
    day = day < 10 ? ('0' + day) : day;

    return `${year}-${month}-${day}`;
}

// форматує "2021-07-03 13:30" в обєкт дати "Wed Aug 04 2021 12:53:00 GMT+0300 (Eastern European Summer Time)"
export const formatToLocalDate = (fullDate, hours, addedTime) => {
    if (addedTime) {
        const result = new Date(`${fullDate}`).setHours(parseInt(hours.slice(0, 2)) + 1, parseInt(hours.slice(3, 5)));
        return new Date(result);
    }
    return new Date(`${fullDate} ${hours}`);
}

export const getTimeFromDate = (date) => {
    const hours = date.getHours();
    let minutes = date.getMinutes();

    return `${hours}:${minutes}`
}

export const updateFieldsInObj = (oldObj, stateObj) => {
    const newFields = {};
    for (const [key, value] of Object.entries(oldObj)) {
        if (stateObj[key] && key.toString() !== stateObj[key].toString()) {
            newFields[key] = stateObj[key]
        }
    }

    return newFields;
}

