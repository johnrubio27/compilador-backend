const Type = require('./Type');
const SymbolTable = require('./SymbolTable');

class For {
    constructor(_decla, _exp, _assig, _body, _row, _col) {
        this.declaration = _decla;
        this.exp = _exp;
        this.assignment = _assig
        this.body = _body;
        this.row = _row;
        this.column = _col;
    }

    operate(tab, count) {
        var s = new SymbolTable(tab);
        if (this.declaration != null) {
            if (this.declaration.operate(s, count) == null) {
                return null;
            }
        }

        var r = this.exp.operate(s, count);
        if (r == null) {
            count.putError(Type.SINTACTICO, "No se puede ejecutar la operacion " + r.type + ", se necesita una condicion logica o relacional.", this.row, this.column);
            return null;
        }
        if (r.type != Type.BOOL) {
            count.putError(Type.SINTACTICO, "No se puede ejecutar la operacion " + r.type + ", se necesita una condicion logica o relacional.", this.row, this.column);
            return null;
        }


        while (r.value == true) {
            for (var i = 0; i < this.body.length; i++) {
                this.body[i].operate(s, count)
            }

            if (this.assignment != null) {
                if(this.assignment.operate(s, count) == null) {
                    return null;
                }
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
        }
        return true;
    }
}

module.exports = For;