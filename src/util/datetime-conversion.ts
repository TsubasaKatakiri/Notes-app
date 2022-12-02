export const datetimeConversion = (timestamp : number) : string => {
    const date = new Date(timestamp);
    const month = outputCorrection(date.getMonth() + 1);
    const day = outputCorrection(date.getDate());
    const hours = outputCorrection(date.getHours());
    const minutes = outputCorrection(date.getMinutes());
    const seconds = outputCorrection(date.getSeconds());
    const output = `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return output;
}

const outputCorrection = (num : number) : string => {
    return num < 10 ? `0${num}` : `${num}`;
}