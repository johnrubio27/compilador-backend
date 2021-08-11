const Type = require('./Type');
const SymbolTable = require('./SymbolTable');

class DoWhile {
    constructor(e, c, _row, _column) {
        this.row = _row;
        this.column = _column;
        this.exp = e;
        this.body = c;
    }

    operate(tab, count) {
        var s = new SymbolTable(tab);
        var r;
        do {
            for (var i = 0; i < this.body.length; i++) {
                this.body[i].operate(s, count)
            }

            r = this.exp.operate(s, count);
            if (r == null) {
                count.putError(Type.SINTACTICO, "No se puede ejecutar la operacion " + r.type + ", se necesita una condicion logica o relacional.", this.row, this.column);
                return null;
            }
            if (r.type != Type.BOOL) {
                count.putError(Type.SINTACTICO, "No se puede ejecutar la operacion " + r.type + ", se necesita una condicion logica o relacional.", this.row, this.column);
                return null;
            }
        } while (r.value == true)

        return true;
    }
}

module.exports = DoWhile;