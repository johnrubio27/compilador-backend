const Type = require('./Type');


class Unary{
    constructor(_id, _type, _row, _col){
        this.id = _id;
        this.type = _type;
        this.row = _row;
        this.column = _col;
    }

    operate(tab, count){
        var a = tab.getSymbol(this.id);
        
        if (a == null) {
            count.putError(Type.SEMANTICO, "Variable " + this.id + " no encontrada.", this.row, this.column);
        } else {
            if (a.type != Type.ENTERO && a.type != Type.DECIMAL) {
                count.putError(Type.SEMANTICO, 'No se puede asignar VALOR a ' + a.id + ' Tipo incompatible para operador unario.', this.row, this.column);
                return null;
            }
            if(this.type == Type.INCREMENTO){
                a.value = a.value + 1;
                return true;
            }else {
                a.value = a.value - 1;
                return true;
            }
            

        }
        return null;
    }
}


module.exports = Unary;