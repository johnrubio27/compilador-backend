const Type = require('./Type');
const Count = require('./Counters');
var Logical = require('./Logical');
var Relational = require('./Relational');
var Arithmetical = require('./Arithmetical');
var Value = require('./Value');

class Print {
    constructor(val, _type, _type_exp, _row, _column) {
        this.value = val;
        this.type = _type;
        this.type_exp = _type_exp;
        this.row = _row;
        this.column = _column;
    }

    operate(tab, count) {
        var e = this.value.operate(tab, count);
        
        if (e != null) {
            count.output += e.value + "\n";
        } else {
            count.putError(Type.SEMANTICO, "Hubo un error al Ejecutar Imprimir.", this.row, this.column);
        }
        return null;
    }

}

module.exports = Print;