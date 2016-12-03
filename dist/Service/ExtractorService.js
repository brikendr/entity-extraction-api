"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Stanford = require("stanford-ner");
const ner = new Stanford.NER();
//Use with promises
function promises() {
    ner.getEntities("This is an awesome library by Stanford folks")
        .then((val) => {
        console.log(val);
        console.log("------------------");
    });
    ner.getEntities("The fate of Lehman Brothers, the beleaguered investment bank, hung in the balance on Sunday as Federal Reserve officials and the leaders of major financial institutions continued to gather in emergency meetings trying to complete a plan to rescue the stricken bank.  Several possible plans emerged from the talks, held at the Federal Reserve Bank of New York and led by Timothy R. Geithner, the president of the New York Fed, and Treasury Secretary Henry M. Paulson Jr.")
        .then((val) => {
        console.log(val);
        console.log("------------------");
    });
}
//Or use the async/await pattern
function awaits() {
    return __awaiter(this, void 0, void 0, function* () {
        const firstResult = yield ner.getEntities("The rain in Spain falls mainly in the plains.");
        console.log(firstResult);
        console.log("------------------");
        const secondResult = yield ner.getEntities("Humpty Dumpty sat on a wall.");
        console.log(secondResult);
        console.log("------------------");
    });
}
