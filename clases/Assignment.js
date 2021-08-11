const Type = require('./Type');

class Assignment {
    constructor(_id, _val, _row, _column) {
        this.value = _val;
        this.id = _id;
        this.row = _row;
        this.column = _column;
    }

    operate(tab, count) {
        var a = tab.getSymbol(this.id);
        if (a == null) {
            count.putError(Type.SEMANTICO, "Variable " + this.id + " no encontrada.", this.row, this.column);
            return null;
        }
        var tmpExp = this.value.operate(tab, count);

        if (tmpExp == null) {
            count.putError(Type.SEMANTICO, "Hubo un error al realizar la asignacion de la variable " + this.id + ".", this.row, this.column);
            return null;
        }
        if (this.checkType(tmpExp, a.type, count)) {
            return null;
        }
        a.type_exp = tmpExp.type_exp;
        a.type = tmpExp.type;
        a.value = tmpExp.value;
        return true;
    }

    checkType(val, type, cont) {
        if (type != val.type) {
            cont.putError(Type.SEMANTICO, 'Tipo de la EXPRESION ' + val.type + ' No Asignable a un ' + type + '.', this.row, this.column);
            return true;
        }
        return false;
    }

}

module.exports = Assignment;