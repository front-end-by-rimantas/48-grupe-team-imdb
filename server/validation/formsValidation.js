import { charObj } from "../data/validationData.js";
import { alphabetLtObj } from "../data/validationData.js";

function isValidUsername(text) {

    if (text.length < 1) {
        return 'Too short';
    }

    if (text.length > 20) {
        return 'Too long';
    }

    const valid = true;
    let invalidSymbols = '';

    for (let i = 0; i < text.length; i++) {
        //a-z
        //ąčęėįšųūž
        const letterLt = alphabetLtObj[text[i]];
        const symbolAtCharCode = text.charCodeAt(i);

        if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
            valid;
        } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
            valid;
        } else if (letterLt) {
            valid;
        } else invalidSymbols += text[i];
    }

    if (invalidSymbols.length > 0) {
        return `This "${invalidSymbols}" symbol cannot be used`
    }

    return text;
}


function isValidEmail(text) {
    const emailMinLength = 6;
    const emailMaxLength = 50;
   
    if (text.length < emailMinLength) {
        return 'Too short';
    }

    if (text.length > emailMaxLength) {
        return 'Too long';
    }

    let countAtTheRate = 0;
    let parts = null;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '@') {
            countAtTheRate++
        }
    }

    if (countAtTheRate === 1) {
        parts = text.split('@');
    } else {
        return 'The part after the @ should not contain the @ character'
    }

    const recipientName = parts[0];
    const domainNameParts = parts[1].split('.');
    const domain = domainNameParts[domainNameParts.length -1];
    const domainName = parts[1].slice(0, -(domain.length +1));
 
    const firstCharacter = recipientName[0];
    const lastCharacter = recipientName[recipientName.length -1];
    
    let recipientNameStr = '';
    let invalidCharacters = '';

    for (let i = 0; i < recipientName.length; i++) {
        //a-z
        //0-9
        //!# $ % & '* + - /.=?_
        const symbolAtCharCode = recipientName.charCodeAt(i);

        if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
            recipientNameStr += recipientName[i];
        } else if (recipientName[i] >= '0' && recipientName[i] <= '9') {
            recipientNameStr += recipientName[i];
        } else if (symbolAtCharCode === charObj.equal || symbolAtCharCode === charObj.questionMark || symbolAtCharCode === charObj.underscore) {
            if (firstCharacter !== recipientName[i] && recipientName[i] !== lastCharacter && recipientName[i] !== recipientName[i + 1]) {
                recipientNameStr += recipientName[i];
            } else invalidCharacters += recipientName[i];
        } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
            recipientNameStr += recipientName[i];
        } else if (symbolAtCharCode >= charObj.specialCharactersBeginning && symbolAtCharCode <= charObj.specialCharactersEnd && symbolAtCharCode !== charObj.quotationMark) {
            if (firstCharacter !== recipientName[i] && recipientName[i] !== lastCharacter && recipientName[i] !== recipientName[i + 1]) {
                recipientNameStr += recipientName[i];
            } else invalidCharacters += recipientName[i];
        } else if (symbolAtCharCode >= charObj.specialCharactersBeginning2  && symbolAtCharCode <= charObj.specialCharactersEnd2 && symbolAtCharCode !== charObj.comma) {
            if (firstCharacter !== recipientName[i] && recipientName[i] !== lastCharacter && recipientName[i] !== recipientName[i + 1]) {
                recipientNameStr += recipientName[i];
            } else invalidCharacters += recipientName[i];
        } else invalidCharacters += recipientName[i];

    }

    let domainNameStr = '';
    let invalidDomainCharacters = '';
    let isIpAddress = '';

    for (let i = 0; i < domainName.length; i++) {
        //a-z
        //0-9
        //-.
        const symbolAtCharCode = domainName.charCodeAt(i);

        if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
            domainNameStr += domainName[i];
        } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
            domainNameStr += domainName[i];
        } else if (domainName[i] >= '0' && domainName[i] <= '9') {
            domainNameStr += domainName[i];
            isIpAddress += domainName[i];
        } else if (symbolAtCharCode === charObj.minus || symbolAtCharCode === charObj.dot) {
            if (firstCharacter !== domainName[i] && domainName[i] !== lastCharacter && domainName[i] !== domainName[i + 1]) {
                domainNameStr += domainName[i];
                if (symbolAtCharCode === charObj.dot) {
                    isIpAddress += domainName[i];
                }
            } else invalidDomainCharacters += recipientName[i];
        } else invalidDomainCharacters += domainName[i];        
    }


    if (recipientName.length !== recipientNameStr.length) {
        return `"${invalidCharacters[0]}" Used in the wrong "${recipientName}" place`
    }

    if (domainName.length !== domainNameStr.length) {
        return `"${invalidDomainCharacters[0]}" Used in the wrong ${domainName} place`
    }

    if (domain.length < 2) {
        return `Domain too short: ${domain}`
    }

    if (domain.length > 5) {
        return `Domain too long: ${domain}`
    }

    if (domainName.length === isIpAddress.length) {
        return `"${isIpAddress}" Invalid format`
    }

    return text;
}

function isValidPassword(text) {
    const passwordMinLength = 8;
    const passwordMaxLength = 50;
    const minimumLimit = 1;
    const valid = true;

    if (text.length < passwordMinLength) {
        return 'Too short';
    }

    if (text.length > passwordMaxLength) {
        return 'Too long';
    }

    let countLowerCaseLetters = 0;
    let countUpperCaseLetters = 0;
    let countNumbers = 0;

    let invalidPasswordStr = '';

    for (let i = 0; i < text.length; i++) {
        //a-z
        //0-9
        //!# $ % & '* + - /.=?_
        const symbolAtCharCode = text.charCodeAt(i);

        if (symbolAtCharCode >= charObj.alphabetBeginning && symbolAtCharCode <= charObj.alphabetEnd) {
            valid;
            countLowerCaseLetters++
        } else if (symbolAtCharCode >= charObj.alphabetUpperCaseBeginning && symbolAtCharCode <= charObj.alphabetUpperCaseEnd) {
            valid;
            countUpperCaseLetters++
        } else if (symbolAtCharCode >= charObj.specialCharactersBeginning && symbolAtCharCode <= charObj.specialCharactersEnd && symbolAtCharCode !== charObj.quotationMark) {
            valid;
        } else if (symbolAtCharCode >= charObj.specialCharactersBeginning2  && symbolAtCharCode <= charObj.specialCharactersEnd2 && symbolAtCharCode !== charObj.comma) {
            valid;
        } else if (symbolAtCharCode === charObj.equal || symbolAtCharCode === charObj.questionMark || symbolAtCharCode === charObj.underscore) {
            valid;
        } else if (text[i] >= '0' && text[i] <= '9') {
            valid;
            countNumbers++
        } else invalidPasswordStr += text[i];
    }
   
    if (invalidPasswordStr.length > 0) {
        return `This "${invalidPasswordStr}" symbol cannot be used`;
    }

    if (countLowerCaseLetters < minimumLimit) {
        return 'There must be at least one lowercase letter';
    }

    if (countUpperCaseLetters < minimumLimit) {
        return 'There must be at least one uppercase letter';
    }

    if (countNumbers < minimumLimit) {
        return 'There must be at least one number';
    }

    return text;
}



export {isValidUsername, isValidEmail, isValidPassword};