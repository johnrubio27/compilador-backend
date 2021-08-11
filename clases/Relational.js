const Type = require('./Type');
const Value = require('./Value');

class Relational {
    constructor(left, right, t, te, _row, _column) {
        this.type = t;
        this.node_left = left;
        this.node_right = right;
        this.type_exp = te;
        this.row = _row;
        this.column = _column;
    }

    operate(tab, count){
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
                if (tempL.type == Type.ENTERO && tempR.type == Type.ENTERO) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYOR) {
                        return new Value(tempL.value > tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENOR) {
                        return new Value(tempL.value < tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYORIGUAL) {
                        return new Value(tempL.value >= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENORIGUAL) {
                        return new Value(tempL.value <= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                    return null;
                } else if (tempL.type == Type.ENTERO && tempR.type == Type.DECIMAL) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYOR) {
                        return new Value(tempL.value > tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENOR) {
                        return new Value(tempL.value < tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYORIGUAL) {
                        return new Value(tempL.value >= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENORIGUAL) {
                        return new Value(tempL.value <= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                } else if (tempL.type == Type.DECIMAL && tempR.type == Type.ENTERO) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYOR) {
                        return new Value(tempL.value > tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENOR) {
                        return new Value(tempL.value < tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYORIGUAL) {
                        return new Value(tempL.value >= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENORIGUAL) {
                        return new Value(tempL.value <= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                } else if (tempL.type == Type.ENTERO && tempR.type == Type.CARACTER) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYOR) {
                        return new Value(tempL.value > tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENOR) {
                        return new Value(tempL.value < tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYORIGUAL) {
                        return new Value(tempL.value >= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENORIGUAL) {
                        return new Value(tempL.value <= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                } else if (tempL.type == Type.CARACTER && tempR.type == Type.ENTERO) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYOR) {
                        return new Value(tempL.value > tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENOR) {
                        return new Value(tempL.value < tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYORIGUAL) {
                        return new Value(tempL.value >= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENORIGUAL) {
                        return new Value(tempL.value <= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                } else if (tempL.type == Type.DECIMAL && tempR.type == Type.CARACTER) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYOR) {
                        return new Value(tempL.value > tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENOR) {
                        return new Value(tempL.value < tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYORIGUAL) {
                        return new Value(tempL.value >= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENORIGUAL) {
                        return new Value(tempL.value <= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                } else if (tempL.type == Type.CARACTER && tempR.type == Type.DECIMAL) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYOR) {
                        return new Value(tempL.value > tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENOR) {
                        return new Value(tempL.value < tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYORIGUAL) {
                        return new Value(tempL.value >= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENORIGUAL) {
                        return new Value(tempL.value <= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                } else if (tempL.type == Type.DECIMAL && tempR.type == Type.DECIMAL) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYOR) {
                        return new Value(tempL.value > tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENOR) {
                        return new Value(tempL.value < tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYORIGUAL) {
                        return new Value(tempL.value >= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENORIGUAL) {
                        return new Value(tempL.value <= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                } else if (tempL.type == Type.CARACTER && tempR.type == Type.CARACTER) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYOR) {
                        return new Value(tempL.value > tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENOR) {
                        return new Value(tempL.value < tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MAYORIGUAL) {
                        return new Value(tempL.value >= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.MENORIGUAL) {
                        return new Value(tempL.value <= tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                } else if (tempL.type == Type.CADENA && tempR.type == Type.CADENA) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.REFERECIA) {
                        return new Value(tempL.value > tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                } else if (tempL.type == Type.BOOL && tempR.type == Type.BOOL) {
                    if (this.type == Type.IDENTICO) {
                        return new Value(tempL.value == tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    } else if (this.type == Type.DIFERENTE) {
                        return new Value(tempL.value != tempR.value, Type.BOOL, Type.VALOR, this.row, this.column);
                    }
                }
            }

        }
        count.putError(Type.SEMANTICO,'Operacion no permitida '+this.type,this.row,this.column);
        return null;
    }


}

module.exports = Relational;