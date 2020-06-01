import * as moment from 'moment';

export const formatTimestamp = (timestamp) => {
    return moment.unix(timestamp).format('DD/MM/YY, h:mm:ss A')
}