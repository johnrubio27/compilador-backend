const Type = require('./Type');
const Value = require('./Value')
const Symbol = require('./Symbol')
const SymbolTable = require('./SymbolTable')

class Call {
    constructor(_id, _type, _type_exp, _param, _row, _column) {
        this.id = _id;
        this.type = _type;
        if (_param == null) {
            this.param = []
        } else {
            this.param = _param;
        }
        this.type_exp = _type_exp;
        this.column = _column;
        this.row = _row;

    }

    operate(tab, count) {

        var f = tab.getFunction(this.id);
        if (f == null) {
            count.putError(Type.SEMANTICO, "Funcion: " + this.id + ", No Declarada.", this.row, this.column);
            return null;
        }
        var paramST = new SymbolTable(null, count);
        var st = new SymbolTable(tab, count);
        if (f.param != null) {
            if (f.param.length != this.param.length) {
                count.putError(Type.SEMANTICO, "La Cantidad de parametros de la LLAMADA no Coinciden con la FUNCION.", this.row, this.column);
                return null;
            }
            for (var i = 0; i < f.param.length; i++) {
                if (!paramST.existsDirect(f.param[i].id)) {
                    var tmpV = this.param[i].operate(st, count);
                    if (tmpV == null) {
                        count.putError(Type.SEMANTICO, "Parametro en la posicion " + (i + 1) + " NO VALIDO.", this.row, this.column);
                        return null;
                    }
                    if (tmpV.type != f.param[i].type) {
                        count.putError(Type.SEMANTICO, "Tipos incompatibles del parametro en la posicion " + (i + 1), this.row, this.column);
                        return null;
                    }
                    paramST.addSymbolDirect(new Symbol(f.param[i].id, tmpV.type, tmpV.type_exp, Type.LOCAL, tmpV.value));
                }

            }
        }

        st.symbols = paramST.symbols;
        for (var i = 0; i < f.body.length; i++) {
            f.body[i].operate(st, count);
        }
        return new Value(null, Type.NULL, Type.VALOR, this.row, this.column);

    }
}

module.exports = Call;