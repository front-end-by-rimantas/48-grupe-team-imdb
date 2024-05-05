export function cookieGenerator(size) {
    const characterList = 'abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ0123456789';

    let cookieGenerated = '';

    for (let i = 0; i < size; i++) {
        cookieGenerated += characterList[Math.floor(Math.random() * characterList.length)];
    } 

    return cookieGenerated;
}