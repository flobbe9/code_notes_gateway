/**
 * @param date to format, default is ```new Date()```
 * @returns nicely formatted string formatted like ```year-month-date hours:minutes:seconds:milliseconds```
 */
export function getTimeStamp(date = new Date()): string {
    return (
        date.getFullYear() +
        "-" +
        prepend0ToNumber(date.getMonth() + 1) +
        "-" +
        prepend0ToNumber(date.getDate()) +
        " " +
        prepend0ToNumber(date.getHours()) +
        ":" +
        prepend0ToNumber(date.getMinutes()) +
        ":" +
        prepend0ToNumber(date.getSeconds()) +
        ":" +
        prepend0ToNumber(date.getMilliseconds(), 3)
    );
}

/**
 * @param num to prepend a 0 to
 * @param totalDigits number of digits (including `num`) to stop prepending zeros at. Default is 2, that would make `5 => 05`
 * @returns a string representation of given number with a 0 prended if the number has only one digit
 */
function prepend0ToNumber(num: number, totalDigits = 2): string {
    let str = num.toString();

    while (str.length < totalDigits)
        // case: one digit only
        str = "0" + str;        

    return str;
}


/**
 * Throws at the first arg beeing falsy (but not if no args are specified). Use util "isFalsy" methods for primitive types.
 *
 * @param args to check
 */
export function assertFalsyAndThrow(...args: any[]): void {
    if (!args || !args.length) return;

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        let falsy = false;

        if (typeof arg === "number") falsy = isNumberFalsy(arg);
        else falsy = isFalsy(arg);

        if (falsy) throw new Error(`Invalid arg at index ${i}`);
    }
}

/**
 * @param obj 
 * @returns `true` if, and only if, `obj` is `undefined` or `null`
 */
export function isFalsy(obj: any): boolean {
    return obj === undefined || obj === null;
}

export function isNumberFalsy(num: any): boolean {
    return num === undefined || num === null || isNaN(num);
}

/**
 * @param expected first value to compare
 * @param actual second value to compare
 * @returns ```expected === actual``` after calling ```toLowerCase()``` on both values.
 *          Types wont be considered: ```"1" === 1 = true```
 */
export function equalsIgnoreCase(expected: string | number | undefined, actual: string | number | undefined): boolean {

    if (!expected || !actual)
        return expected === actual;

    expected = expected.toString().toLowerCase();
    actual = actual.toString().toLowerCase();

    return expected === actual;
}
