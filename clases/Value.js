const Type = require('./Type')
class Value {
    type_var = '';
    constructor(val, t, te, _row, _column) {
        this.value = val;
        this.type = t;
        this.type_exp = te;
        this.row = _row;
        this.column = _column;
    }

    operate(tab, count) {
        if (this.type_exp == Type.VALOR) {
            switch (this.type) {
                case Type.ENTERO:
                    return new Value(this.value, this.type, this.type_exp, this.row, this.column);

                case Type.DECIMAL:
                    return new Value(this.value, this.type, this.type_exp, this.row, this.column);

                case Type.DEFAULT:
                    return new Value(this.value, this.type, this.type_exp, this.row, this.column);

                case Type.CADENA:
                    this.value = this.value.replace(/\\n/g, '\n');
                    this.value = this.value.replace(/\\t/g, '\t');
                    this.value = this.value.replace(/\\r/g, '\r');
                    if (this.value.toString().startsWith("\"")) {
                        this.value = this.value.toString().substring(1, this.value.toString().length - 1);
                    }
                    this.value = this.value.toString().replace(/\\\"/g, "\"");
                    return new Value(this.value, this.type, this.type_exp, this.row, this.column);

                case Type.BOOL:
                    if(this.value == true){
                        return new Value(true, this.type, this.type_exp, this.row, this.column);
                    }
                    return new Value(false, this.type, this.type_exp, this.row, this.column);
                case Type.NULL:
                    return new Value('null', Type.NULL, Type.VALOR, this.row, this.column);
                case Type.CARACTER:
                    var ret = this.value.replace(/'/g,'');
                    
                    if(String(ret) === "\\n"){
                        return new Value(10, Type.CARACTER, Type.VALOR, this.row, this.column);
                    } else if(ret === "\\r"){
                        return new Value(8, Type.CARACTER, Type.VALOR, this.row, this.column);
                    } else if(ret === "\\t"){
                        return new Value(9, Type.CARACTER, Type.VALOR, this.row, this.column);
                    }
                    return new Value(ret.charCodeAt(0), Type.CARACTER, Type.VALOR, this.row, this.column);
                case Type.ID:
                    var a = tab.exists(this.value);
                    if (a) {
                        var r = tab.getSymbol(this.value);
                        return new Value(r.value, r.type, r.type_exp, r.row, r.column);

                    } else {
                        count.putError(Type.SEMANTICO, "Variable " + this.value + " no encontrada.", this.row, this.column);
                        return null;
                    }
                default:
                    count.putError(Type.SEMANTICO, "Tipo " + this.type + " no Valido.", this.row, this.column);
                    return new Value(null, Type.ERROR, Type.ERROR, this.row, this.column);
            }
        } else {
            /*
            Procesar otro tipos de datos como vectores o matrices
            */
        }
    }

}

module.exports = Value;