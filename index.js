
"use strict";
/**
 * check validity of Markup language
 * @param {string} text - Text string
 * @returns {string}
 */
function isValid(text) {
    if (!text) {
        return "Text required"
    }

    const stack = [];
    const length = text.length;

    let tag;
    let errors = [];

    for (let i = 0; i < length; ++i) {

        if (text[i] === "<") {
            if (isStartTag(text, i)) {
                tag = text.substr(i, 3);
                stack.push(tag);
                i = i + 2

            } else if (isEndTag(text, i)) {
                let endTag = text.substr(i, 4);

                const startTag = stack.pop();
                const expected = startTag ? startTag.replaceAll("<", "</") : null;

                if (!startTag) {
                    errors.push({ expected: "#", found: endTag });
                    break;
                }

                if (endTag !== expected) {
                    errors.push({ expected, found: endTag });
                    break;
                }


                i = i + 3

            }
        }

    }

    for (let tag of stack.reverse()) {
        errors.push({ expected: tag.replaceAll("<", "</"), found: "#" });
    }

    if (errors.length > 0) {
        const { expected, found } = errors[0]
        return `Expected ${expected} found ${found}`
    }

    return "Correctly tagged paragraph"
}

function isStartTag(text = "", index) {
    return /<[A-Z]>/.test(text.substr(index, 3))
}
function isEndTag(text = "", index) {
    return /<\/[A-Z]>/.test(text.substr(index, 4))
}

module.exports = isValid;