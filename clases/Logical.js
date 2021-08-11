const Type = require('./Type');
const Value = require('./Value');

class Logical {
    constructor(left, right, t, te, _row, _column) {
        this.type = t;
        this.node_left = left;
        this.node_right = right;
        this.type_exp = te;
        this.row = _row;
        this.column = _column;
    }

    operate(tab, count) {
        var tempL = null;
        var tempR = null;

        if (this.node_left != null) {
            tempL = this.node_left.operate(tab, count);
        }

        if (this.node_right != null) {
            tempR = this.node_right.operate(tab, count);
        }

        if (tempL != null && tempR != null) {
            if (tempL.type_exp == Type.VALOR && tempR.type_exp == Type.VALOR) {
                if (tempL.type == Type.BOOL && tempR.type == Type.BOOL) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.AND:
                                return new Value(tempL.value && tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                            case Type.OR:
                                return new Value(tempL.value || tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                            default:
                                break;
                        }
                    }
                    count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type + ", No reconocida o No Permitida.", this.row, this.column);
                }
            }
        } else if (tempR == null && tempL != null) {
            if (tempL.type_exp == Type.VALOR) {
                if (this.type == Type.NOT) {
                    if (tempL.value == true) {
                        return new Value(false, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else {
                        return new Value(true, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                }
            }
            count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type + ", No reconocida o No Permitida.", this.row, this.column);
        }
        return null;
    }

}

module.exports = Logical;