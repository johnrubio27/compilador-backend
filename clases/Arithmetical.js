const Type = require('./Type')
const Value = require('./Value');


class Arithmetical {

    constructor(left, right, t, te, _row, _column) {
        this.type = t;
        this.node_left = left;
        this.node_right = right;
        this.type_exp = te;
        this.row = _row;
        this.column = _column;
    }

    operate(tab,count) {
        var tempL = null;
        var tempR = null;
        if (this.node_left != null) {
            tempL = this.node_left.operate(tab,count);
            
        }
        if (this.node_right != null) {
            tempR = this.node_right.operate(tab,count);
            
        }

        if (tempR != null && tempL != null) {
            if (tempR.type_exp == Type.VALOR && tempL.type_exp == Type.VALOR) {
                if (tempL.type == Type.ENTERO && tempR.type == Type.ENTERO) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.ENTERO, Type.VALOR, this.row, this.column);
                            case Type.RESTA:
                                return new Value(tempL.value - tempR.value, Type.ENTERO, Type.VALOR, this.row, this.column);
                            case Type.MULTIPLICACION:
                                return new Value(tempL.value * tempR.value, Type.ENTERO, Type.VALOR, this.row, this.column);
                            case Type.DIVISION:
                                return new Value(tempL.value / tempR.value, Type.ENTERO, Type.VALOR, this.row, this.column);
                            case Type.POTENCIA:
                                return new Value(Math.pow(tempL.value, tempR.value), Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.MODULO:
                                return new Value(tempL.value % tempR.value, Type.ENTERO, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.ENTERO && tempR.type == Type.DECIMAL) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.RESTA:
                                return new Value(tempL.value - tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.MULTIPLICACION:
                                return new Value(tempL.value * tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.DIVISION:
                                return new Value(tempL.value / tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.DECIMAL && tempR.type == Type.ENTERO) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.RESTA:
                                return new Value(tempL.value - tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.MULTIPLICACION:
                                return new Value(tempL.value * tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.DIVISION:
                                return new Value(tempL.value / tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.ENTERO && tempR.type == Type.CARACTER) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.RESTA:
                                return new Value(tempL.value - tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.MULTIPLICACION:
                                return new Value(tempL.value * tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.DIVISION:
                                return new Value(tempL.value / tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.CARACTER && tempR.type == Type.ENTERO) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.RESTA:
                                return new Value(tempL.value - tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.MULTIPLICACION:
                                return new Value(tempL.value * tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.DIVISION:
                                return new Value(tempL.value / tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.ENTERO && tempR.type == Type.CADENA) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.CADENA && tempR.type == Type.ENTERO) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.DECIMAL && tempR.type == Type.CADENA) {
                    if (this.type == Type.SUMA) {
                        return new Value(tempL.value + tempR.value.toString(), Type.CADENA, Type.VALOR, this.row, this.column);
                    }
                    count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                    return null;
                } else if (tempL.type == Type.CADENA && tempR.type == Type.DECIMAL) {
                    if (this.type == Type.SUMA) {
                        return new Value(tempL.value + tempR.value.toString(), Type.CADENA, Type.VALOR, this.row, this.column);
                    }
                    count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                    return null;
                } else if (tempL.type == Type.DECIMAL && tempR.type == Type.CARACTER) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.RESTA:
                                return new Value(tempL.value - tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.MULTIPLICACION:
                                return new Value(tempL.value * tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.DIVISION:
                                return new Value(tempL.value / tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.CARACTER && tempR.type == Type.DECIMAL) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.RESTA:
                                return new Value(tempL.value - tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.MULTIPLICACION:
                                return new Value(tempL.value * tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.DIVISION:
                                return new Value(tempL.value / tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.DECIMAL && tempR.type == Type.DECIMAL) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.RESTA:
                                return new Value(tempL.value - tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.MULTIPLICACION:
                                return new Value(tempL.value * tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.DIVISION:
                                return new Value(tempL.value / tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.CARACTER && tempR.type == Type.CARACTER) {
                    if (null != this.type) {
                        switch (this.type) {
                            case Type.SUMA:
                                return new Value(tempL.value + tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.RESTA:
                                return new Value(tempL.value - tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.MULTIPLICACION:
                                return new Value(tempL.value * tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            case Type.DIVISION:
                                return new Value(tempL.value / tempR.value, Type.DECIMAL, Type.VALOR, this.row, this.column);
                            default:
                                count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                                break;
                        }
                    }
                    return null;
                } else if (tempL.type == Type.CARACTER && tempR.type == Type.CADENA) {
                    if (this.type == Type.SUMA) {
                        return new Value(tempL.value + tempR.value.toString(), Type.CADENA, Type.VALOR, this.row, this.column);
                    }
                    count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                    return null;
                } else if (tempL.type == Type.CADENA && tempR.type == Type.CARACTER) {
                    if (this.type == Type.SUMA) {
                        return new Value(tempL.value + tempR.value.toString(), Type.CADENA, Type.VALOR, this.row, this.column);
                    }
                   count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                    return null;
                } else if (tempL.type == Type.CADENA && tempR.type == Type.CADENA) {
                    if (this.type == Type.SUMA) {
                        return new Value(tempL.value.toString() + tempR.value.toString(), Type.CADENA, Type.VALOR, this.row, this.column);
                    }
                    count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                    return null;
                } else if (tempL.type == Type.CADENA && tempR.type == Type.BOOL) {
                    if (this.type == Type.SUMA) {
                        return new Value(tempL.value.toString() + tempR.value.toString(), Type.CADENA, Type.VALOR, this.row, this.column);
                    }
                    count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                    return null;
                } else if (tempL.type == Type.BOOL && tempR.type == Type.CADENA) {
                    if (this.type == Type.SUMA) {
                        return new Value(tempL.value.toString() + tempR.value.toString(), Type.CADENA, Type.VALOR, this.row, this.column);
                    }
                    count.putError(Type.SEMANTICO, "No se puede ejecutar la operacion " + this.type.toString() + ", No reconocida o No Permitida.", this.row, this.column);
                    return null;
                }
            }
        }
        count.putError(Type.SEMANTICO, 'No se Encontrado una Operacion Valida.', this.row, this.column);
        return null;
    }

}

module.exports = Arithmetical;