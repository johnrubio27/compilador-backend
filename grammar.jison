%{
	const Logical = require('./clases/Logical');
	const Relational = require('./clases/Relational');
    const Arithmetical = require('./clases/Arithmetical');
    const Value = require('./clases/Value');
    const Print = require('./clases/Print');
    const Declaration = require('./clases/Declaration');
    const IfList = require('./clases/IfList');
    const Else = require('./clases/Else');
    const If = require('./clases/If');
    const While = require('./clases/While');
    const DoWhile = require('./clases/DoWhile');
    const Assignment = require('./clases/Assignment');
    const For = require('./clases/For');
    const Unary = require('./clases/Unary');
	const Type = require('./clases/Type');
    const Count = require('./clases/Counters');
    const SymbolTable = require('./clases/SymbolTable');
	const Call = require('./clases/Call');
    const Function = require('./clases/Function');
    global_var = []
    var count = new Count();
    var symbolt = new SymbolTable(null);
    symbolt.count = count;
    symbolt.functions = [];
%}

/* Definición Léxica */
%lex

%options case-insensitive

%%

"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

//SIMBOLOS
//incremento y decremento
"++"              return 'incremento';
"--"              return 'decremento';

//aritmeticos
"+"              return 'suma';
"-"              return 'resta';   
"*"              return 'multiplicacion';
"^"              return 'potencia';
"/"              return 'slash';
"%"              return 'modulo';

//relacionales
">="               return 'mayorigual';
"<="               return 'menorigual';
"<"                return 'menor';
">"                return 'mayor';
"=="               return 'identico';
"!="               return 'diferente';

//simbolos
"{"              return 'corchetea';     
"}"              return 'corchetec';
"("              return 'parenta';     
")"              return 'parentc';
","              return 'coma';
"."              return 'punto';
"="              return 'igual';
";"              return 'puntocoma';

//logicos
"!"              return 'not';
"&&"              return 'and';
"||"              return 'or';

//Reservadas
"null"                  return 'resnull';
"integer"               return 'resinteger';
"double"                return 'resdouble';
"char"                  return 'reschar';
"string"                return 'resstring';
"true"                  return 'restrue';
"false"                 return 'resfalse';
"if"                    return 'resif';
"else"                  return 'reselse';
"print"                 return 'resprint';
"for"                   return 'resfor';
"while"                 return 'reswhile';
"do"                    return 'resdo';
"boolean"               return 'resboolean';
"void"                  return 'resvoid';

/* Espacios en blanco */
[ \r\t]+                  {}
\n                        {}


\'([^']|"\\n"|"\\r"|"\\t")\'             return 'caracter';
[0-9]+"."[0-9]+\b          			     return 'decimal';
[0-9]+\b                   			     return 'entero';
([\"]("\\\""|[^"])*[^\\][\"])|[\"][\"]   return 'cadena';
([a-zA-Z"_"])[a-z0-9A-Z"_""ñ""Ñ"]*       return 'id';

<<EOF>>                 return 'EOF';

.                       { count.putError(Type.LEXICO,'Este es un error léxico: ' + yytext, yylloc.first_line, yylloc.first_column); }
/lex

/* Asociación de operadores y precedencia */

%right igual
%right interrogacion
%left incremento
%left decremento
%left xor
%left or
%left and
%left identico, diferente, referencias
%left mayor, menor, mayorigual, menorigual
%left suma, resta
%left multiplicacion, slash,modulo
%right potencia
%right not
%left parenta,parentc,llavea,llavec

%start ini

%% /* Definición de la gramática */

ini
	: INSTRUCTIONS EOF {
        for(var i = 0; i< $1.length; i++){
            if($1[i])
                $1[i].operate(symbolt, count)
        }
        global_var = []
        ret = count;
        count = new Count();
        symbolt = new SymbolTable(null);
        symbolt.count = count;
        symbolt.functions = [];
        return ret;
    }
    | EOF
;

TYPE
     : resinteger {$$ = Type.ENTERO}
     | resdouble {$$ = Type.DECIMAL}
     | resboolean {$$ = Type.BOOL}
     | reschar {$$ = Type.CARACTER}
     | resstring {$$ = Type.CADENA}
;

SEMICOLON
     : puntocoma{}
     | {}
;

BLOCK
     : corchetea BLOCK2 {$$ = $2;}//INSTRUCTIONS corchetec
;

BLOCK2
     : INSTRUCTIONS corchetec {$$ = $1;}
     | corchetec {$$ = []}
;

INSTRUCTIONS
     : INSTRUCTIONS INSTRUCTION {$$ = $1; $$.push($2);}
     | INSTRUCTION {$$ = []; $$.push($1)}
;

INSTRUCTION
    : DECLARATION SEMICOLON {if($1 != null){$$ = $1}}
    | ASSIGNMENT SEMICOLON {$$ = $1;}
    | FUNCTION {symbolt.addFunction($1);}
    | IF {$$ = $1;}
    | WHILE {$$ = $1;}
    | DOWHILE SEMICOLON {$$ = $1;}
    | FOR {$$ = $1;}
    | PRINT SEMICOLON {$$ = $1;}
    | id incremento SEMICOLON {$$ = new Unary($1,Type.INCREMENTO,this._$.first_line,this._$.first_column);}
    | id decremento SEMICOLON {$$ = new Unary($1,Type.DECREMENTO,this._$.first_line,this._$.first_column);}
    | id parenta LISTAVALORES parentc  SEMICOLON { $$ = new Call($1,null,Type.LLAMADA,$3,this._$.first_line,this._$.first_column);}
    | id parenta parentc SEMICOLON { $$ = new Call($1,null,Type.LLAMADA,null,this._$.first_line,this._$.first_column);}
;

LISTAVALORES
     : LISTAVALORES coma EXPRT {$$ = $1; $$.push($3);}
     | EXPRT { $$ = []; $$.push($1);}
;

FUNCTION
    : TYPE id parenta LISTAPARAMETROS parentc BLOCK {$$ = new Function($1,Type.VALOR,$2,$4,$6,this._$.first_line,this._$.first_column);}
    | resvoid id parenta LISTAPARAMETROS parentc BLOCK {$$ = new Function(Type.VOID,Type.VALOR,$2,$4,$6,this._$.first_line,this._$.first_column);}
    | TYPE id parenta parentc BLOCK{$$ = new Function($1,Type.VALOR,$2,null,$5,this._$.first_line,this._$.first_column);}
    | resvoid id parenta parentc BLOCK {$$ = new Function(Type.VOID,Type.VALOR,$2,null,$5,this._$.first_line,this._$.first_column);}
;

LISTAPARAMETROS
     : LISTAPARAMETROS coma TYPE id {$$ = $1; $$.push(new Declaration($4,null,$3,Type.VALOR, Type.LOCAL,this._$.first_line,this._$.first_column));}
     | TYPE id {$$ = []; $$.push(new Declaration($2,null,$1,Type.VALOR, Type.LOCAL,this._$.first_line,this._$.first_column));}
;

PARAMETROUNITARIO
     : parenta EXPRT parentc {$$ = $2;}
;

IF
     :  CELSE ELSE {var t = $1;t.elsebody = $2;$$ = t;}
;

CELSE
     : CELSE reselse IFF {var t = $1; t.lif.push($3); $$ = t;}
     | IFF {var t = new IfList();t.lif.push($1);$$ = t;}
;

ELSE
     : reselse BLOCK {$$ = new Else($2,this._$.first_line,this._$.first_column);}
     | {$$ = null;}
;

IFF
     : resif PARAMETROUNITARIO BLOCK {$$ = new If($2,$3,Type.IF,this._$.first_line,this._$.first_column);}
;

WHILE
     : reswhile PARAMETROUNITARIO BLOCK {$$ = new While($2,$3,this._$.first_line,this._$.first_column);}
;

DOWHILE
     : resdo BLOCK reswhile PARAMETROUNITARIO {$$ = new DoWhile($4,$2,this._$.first_line,this._$.first_column);}
;

FOR
     : resfor parenta DEC puntocoma EXPRT puntocoma ASSIG parentc BLOCK {$$ = new For($3,$5,$7,$9,this._$.first_line,this._$.first_column);}
     | resfor parenta DEC puntocoma  puntocoma ASSIG parentc BLOCK {$$ = new For($3,null,$6,$8,this._$.first_line,this._$.first_column);}
     
;

DEC
    : DECLARATION {$$ = $1;}
    | ASSIGNMENT {$$ = $1;}
    | {$$ = null;}
;

ASSIG
    : ASSIGNMENT {$$ = $1;}
    | id incremento {$$ = new Unary($1,Type.INCREMENTO,this._$.first_line,this._$.first_column);}
    | id decremento {$$ = new Unary($1,Type.DECREMENTO,this._$.first_line,this._$.first_column);}
    | {$$ = null;}
;

ASSIGNMENT
    : id igual EXPRT {$$ = new Assignment($1,$3,this._$.first_line,this._$.first_column);}
;

DECLARATION
     : TYPE id igual EXPRT {$$ = new Declaration($2,$4,$1,Type.VALOR, Type.LOCAL,this._$.first_line,this._$.first_column);}
;

PRINT
    : resprint PARAMETROUNITARIO {$$ = new Print($2,null, Type.IMPRIMIR,this._$.first_line,this._$.first_column);}
;

EXPRT
    : EXPRT or EXPRT {$$ = new Logical($1,$3,Type.XOR,Type.VALOR,this._$.first_line,this._$.first_column);}
    | EXPRT1 {$$ = $1;}
;

EXPRT1
	: EXPRT1 and EXPRT1 {$$ = new Logical($1,$3,Type.OR,Type.VALOR,this._$.first_line,this._$.first_column);}
    |  EXPR {$$ = $1;}
;

//-----------------------------------------------------------------------------------------------------------

//producciones para las operaciones relacionales
EXPR
	: EXPR diferente EXPR {$$ = new Relational($1,$3,Type.DIFERENTE,Type.VALOR,this._$.first_line,this._$.first_column);}
    | EXPR identico EXPR {$$ = new Relational($1,$3,Type.IDENTICO,Type.VALOR,this._$.first_line,this._$.first_column);}
    | EXPR1 {$$ = $1;}
;

EXPR1
     : EXPR1 mayor EXPR1 {$$ = new Relational($1,$3,Type.MAYOR,Type.VALOR,this._$.first_line,this._$.first_column);}
     | EXPR1 menor EXPR1 {$$ = new Relational($1,$3,Type.MENOR,Type.VALOR,this._$.first_line,this._$.first_column);}
     | EXPR1 mayorigual EXPR1 {$$ = new Relational($1,$3,Type.MAYORIGUAL,Type.VALOR,this._$.first_line,this._$.first_column);}
     | EXPR1 menorigual EXPR1 {$$ = new Relational($1,$3,Type.MENORIGUAL,Type.VALOR,this._$.first_line,this._$.first_column);}
     | EXP {$$ = $1;};
//-----------------------------------------------------------------------------------------------------------

//producciones para operaciones aritmeticas
EXP : EXP suma EXP {$$ = new Arithmetical($1,$3,Type.SUMA,Type.VALOR,this._$.first_line,this._$.first_column);}
    | EXP resta EXP {$$ = new Arithmetical($1,$3,Type.RESTA,Type.VALOR,this._$.first_line,this._$.first_column);}
    | EXP1 {$$ = $1;};

EXP1 : EXP1 multiplicacion EXP1 {$$ = new Arithmetical($1,$3,Type.MULTIPLICACION,Type.VALOR,this._$.first_line,this._$.first_column);}
     | EXP1 slash EXP1 {$$ = new Arithmetical($1,$3,Type.DIVISION,Type.VALOR,this._$.first_line,this._$.first_column);}
     | EXP1 modulo EXP1 {$$ = new Arithmetical($1,$3,Type.MODULO,Type.VALOR,this._$.first_line,this._$.first_column);}
     | EXP1 potencia EXP1 {$$ = new Arithmetical($1,$3,Type.POTENCIA,Type.VALOR,this._$.first_line,this._$.first_column);}
     | EXP2 {$$ = $1;};

EXP2
	: not EXP2 {$$ = new Logical($2,null,Type.NOT,Type.VALOR,this._$.first_line,this._$.first_column);}
    | EXP3 {$$ = $1;}
;

EXP3
     : decimal {$$ = new Value(Number($1),Type.DECIMAL,Type.VALOR,this._$.first_line,this._$.first_column);}
     | entero {$$ = new Value(Number($1),Type.ENTERO,Type.VALOR,this._$.first_line,this._$.first_column);}
     | resta decimal {$$ = new Value(-1*Number($2),Type.DECIMAL,Type.VALOR,this._$.first_line,this._$.first_column);}
     | resta entero {$$ = new Value(-1*Number($2),Type.ENTERO,Type.VALOR,this._$.first_line,this._$.first_column);}
     | parenta EXPRT parentc {$$ = $2;}
     | cadena {$$ = new Value($1,Type.CADENA,Type.VALOR,this._$.first_line,this._$.first_column);}
     | caracter {$$ = new Value($1,Type.CARACTER,Type.VALOR,this._$.first_line,this._$.first_column);}
     | restrue {$$ = new Value(true,Type.BOOL,Type.VALOR,this._$.first_line,this._$.first_column);}
     | resfalse {$$ = new Value(false,Type.BOOL,Type.VALOR,this._$.first_line,this._$.first_column);}
     | resnull {$$ = new Value($1,Type.NULL,Type.VALOR,this._$.first_line,this._$.first_column);}
     | id {$$ = new Value($1,Type.ID,Type.VALOR,this._$.first_line,this._$.first_column);}
;   