function token(type,value){
	this.type=type
	this.value=value
}

const SymbolType={ope:0,num:1};

function Eval(){
	let inp=document.getElementById("Input"),
		out=document.getElementById("Output")
	console.log('Evaluating ...')
	console.log(Parse(inp.value))
}

function isNumber(char){
	if(char.trim()==""){
		//smthin is wrong !!!!!!!!!!!!!
		return false
	}
	return !isNaN(char);
}

function Parse(expr){
	let out=[]
	let curnum=0
	for(let i=0;i<expr.length;i++){
		if(!isNumber(expr.charAt(i))){
			//not a number => operation
			//push the previous number then the operation
			out.push(new token(SymbolType.num,curnum))
			switch(expr.charAt(i)){
				case "+":
					out.push(new token(SymbolType.ope,"+"))
					break
				case "*":
					out.push(new token(SymbolType.ope,"*"))
					break
			}
			curnum=0
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


