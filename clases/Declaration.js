const Symbol = require('./Symbol');
const Value = require('./Value');
const SymbolTable = require('./SymbolTable');
const Type = require('./Type');


class Declaration {
    constructor(_id, _value, _type, _type_exp, _type_var,  _row, _column) {
        this.id = _id;
        this.value = _value;
        this.type = _type;
        this.type_exp = _type_exp;
        this.type_var = _type_var;
        this.row = _row;
        this.column = _column;
    }

    operate(tab, count) {

        var tmpExp = null;

        if (this.value != null) {
            tmpExp = this.value.operate(tab, count);

            if (tmpExp == null) {
                count.putError(Type.SEMANTICO, "Hubo un error al realizar la declaracion de la variable " + this.id + ".", this.row, this.column);
                return null;
            }
            if (this.checkType(tmpExp, count)) {
                return null;
            }
        }

        var a = tab.existsDirect(this.id);
        
        if (tmpExp == null) {
            switch (this.type) {
                case Type.DECIMAL:
                    tmpExp = new Value(0.0, this.type, this.type_exp, this.row, this.column);
                    break;
                case Type.ENTERO:
                    tmpExp = new Value(0, this.type, this.type_exp, this.row, this.column);
                    break;
                case Type.CHAR:
                    tmpExp = new Value('\0', this.type, this.type_exp, this.row, this.column);
                    break;
                case Type.BOOL:
                    tmpExp = new Value(false, this.type, this.type_exp, this.row, this.column);
                    break;
            }
        }
        if (a == false) {
            tab.addSymbolDirect(new Symbol(this.id, tmpExp.type, tmpExp.type_exp, this.type_var, tmpExp.value));
            count.putSymbol(this.id, tmpExp.type, tmpExp.type_exp, this.type_var, tmpExp.value);
            return true;
        } else {
            cont.putError(Type.SEMANTICO, "La variable " + this.id + " ya fue declarada en este ambito.", this.row, this.column);
        }
        return null;
    }

    checkType(val, cont) {
        if (this.type != val.type) {
            cont.putError(Type.SEMANTICO, 'Tipo de la EXPRESION ' + val.type + ' No Asignable a un ' + this.type + '.', this.row, this.column);
            return true;
        }
        return false;
    }
}

module.exports = Declaration;