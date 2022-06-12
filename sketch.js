function token(type,value){
	this.type=type
	this.value=value
}

const SymbolType={ope:0,num:1};

function Eval(){
	let inp=document.getElementById("Input"),
		out=document.getElementById("Output")
	console.log('Evaluating ...')
	console.log(Lex(inp.value))
}

function isNumber(char){
	if(char.trim()==""){
		//smthin is wrong !!!!!!!!!!!!!
		return false
	}
	return !isNaN(char);
}

function Lex(expr){
	expr=expr.trim()
	let out=[]
	let curnum=0
	for(let i=0;i<expr.length;i++){
		if(!isNumber(expr.charAt(i))){
			//not a number => operation
			//push the previous number then the operation
			switch(expr.charAt(i)){
				case "+":
					out.push(new token(SymbolType.num,curnum))
					out.push(new token(SymbolType.ope,"+"))
					curnum=0
					break
				case "*":
					out.push(new token(SymbolType.num,curnum))
					out.push(new token(SymbolType.ope,"*"))
					curnum=0
					break
			}
		}else{
			curnum=curnum*10+Number(expr.charAt(i))
		}
	}
	out.push(new token(SymbolType.num,curnum))
	return out
}

function ShuntingYard(expr){
	let stk1=[],
		stk2=[]

}


