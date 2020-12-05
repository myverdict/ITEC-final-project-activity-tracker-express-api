// converting text to lowercase
export function lowercase(text) {
    return text.toLowerCase();
}

// converting text to uppercase
export function uppercase(text) {
    return text.toUpperCase();
}

// representing date in short format as passing a
export function shortDate(date) {
    let dateJS = new Date(date);
    return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(dateJS);
}

// limiting text from text area to view up to 40 characters long
export function textareaDisplayCharacterLimit(text) {
    if (text)                           // if there is text in the textarea
    {
        if (text.length >= 40)          // if text is greater than 40 characters
        {
            // return upto 40 characters and ellipses to indicate more text
            return text.substr(0, 40) + "...";
        }
    }

    return text;
}

// limiting numbers to 2 decimal places
export function decimalPlaces(hours, numberOfDecimalPlaces) {
    let formattedHours = hours.toFixed(numberOfDecimalPlaces);
    return formattedHours;
}

// set the plurality of the word 'hour(s)' in the summary section of the application
export function hoursWordPlurality(numOfHours) {
    if(numOfHours == 1)
    {
        return `1.00 hour`;
    }
    else
    {
        return `${numOfHours} hours`;
    }
}


