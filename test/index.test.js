const isValid = require('../index');
const expect = require('chai').expect;


const validParagraph = "Correctly tagged paragraph"

describe('isValid tag tests', function () {


    it('isValid should return Correctly tagged paragraph', function () {
        expect(isValid("The following text<C><B>is centred and in boldface</B></C>")).to.equal(validParagraph);
        expect(isValid("<B>This <\g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence")).to.equal(validParagraph);
    })

    it('isValid should return Expected </C> found </B>', function () {

        const response = isValid("<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>")
        expect(response).to.equal("Expected </C> found </B>");

    })

    it('isValid should return Expected # found </C>', function () {
        const response = isValid("<B>This should be in boldface, but there is an extra closing tag</B></C>");
        expect(response).to.equal("Expected # found </C>");

    })

    it('isValid should return Expected </B> found #', function () {
        const response = isValid("<B><C>This should be centred and in boldface, but there is a missing closing tag</C>");
        expect(response).to.equal("Expected </B> found #");

    })

    it('isValid should return Text required for null', function () {
        const response = isValid(null);
        expect(response).to.equal("Text required");

    })

});