const Type = require('./Type');
const SymbolTable = require('./SymbolTable');


class IfList {
	constructor() {
		this.lif = [];
		this.elsebody = [];
	}

	operate(tab, count) {
		for (var j = 0; j < this.lif.length; j++) {
			var r = this.lif[j].exp.operate(tab, count);
			if (r == null) {
				count.putError(Type.SINTACTICO, "No se puede ejecutar la instruccion If, se necesita una condicion logica o relacional.", this.lif[j].row, this.lif[j].column);
				return null;
			}
			if (r.type != Type.BOOL) {
				count.putError(Type.SINTACTICO, "No se puede ejecutar la operacion " + r.type + ", se necesita una condicion logica o relacional.", this.lif[j].row, this.lif[j].column);
			}
			if (r.value == true) {
				var s = new SymbolTable(tab);
				for (var i = 0; i < this.lif[j].body.length; i++) {
					this.lif[j].body[i].operate(s, count);
				}
				return true;
			}

		}
		if (this.elsebody != null) {
			var body = this.elsebody.body;
			var s = new SymbolTable(tab);
			for (var i = 0; i < body.length; i++) {

				body[i].operate(s, count);

			}
			return true;
		}
		return null;
	}

}

module.exports = IfList;