import * as moment from 'moment';

export const formatTimestamp = (timestamp) => {
    return moment.unix(timestamp).format('DD/MM/YY, h:mm:ss A')
}

export const removeDuds = (items) => {
    return items.filter(item => item !== null);
}