import {createHash} from 'node:crypto';

export function hash(str) {

    const passwordPart = str.slice(1, 7);

    let salt = '';

    for (let i = 0; i < passwordPart.length; i++) {
        const r = passwordPart.length - 1 - i;
        if (r % 2 === 0) {
            salt += ('' + (passwordPart.charCodeAt(r)) - i);
        } else {
            salt += passwordPart[r];
        }
    }

    return createHash('sha256', {encoding: 'utf8'}).update(salt + str).digest('hex');
}