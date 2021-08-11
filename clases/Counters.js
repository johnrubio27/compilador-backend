const Type = require('./Type');
class Counter {

    constructor(){
        this.clearAll();
    }

    clearAll() {
        this.output = '';
        this.errors = '';
        this.Rsymbol = [];
        this.Rerror = [];
    }
    getOutput() {
        return this.output;
    }

    getError(){
        return this.Rerror;
    }

    putError(type, instruction, row, column) {
        this.Rerror.push({type: type, message: instruction, row: row, column: column});
    }

    getSymbol() {
        return this.Rsymbol;
    }

    putSymbol(_id, _type, _type_exp, _type_var, _value) {
        this.Rsymbol.push({id: _id, type: _type, type_exp: _type_exp, type_var: _type_var, value: _value});
    }


}

module.exports = Counter;