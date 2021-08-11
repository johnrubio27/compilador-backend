class Symbol {
    
    constructor(_id, _type, _type_exp, _type_var, _value){
        this.type = _type;
        this.type_exp = _type_exp;
        this.type_var = _type_var;
        this.id = _id;
        this.value = _value;
    }
}

module.exports = Symbol;