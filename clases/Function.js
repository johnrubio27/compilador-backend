const Count = require('./Counters');
const SymbolTable = require('./SymbolTable');
const Symbol = require('./Symbol');
const Type = require('./Type');

class Function {

    constructor(_type, _type_exp, _id, _param, _body, _row, _col) {
        this.type = _type;
        this.type_exp = _type_exp;
        this.id = _id;
        if (_param == null) {
            this.param = []
        } else {
            this.param = _param;
        }
        this.body = _body;
        this.row = _row;
        this.column = _col;
        this.symbolTab;
    }

    operate(tab, count) {
        return null;
    }

}

module.exports = Function;