function token(type,value){
	this.type=type
	this.value=value
}

const SymbolType={ope:0,num:1};

function Eval(){
	let inp=document.getElementById("Input"),
		out=document.getElementById("Output")
	console.log('Evaluating ...')
	console.log(Parse("10+5"))
}


function Parse(expr){
	let out=[]
	let curnum=0
	for(let i=0;i<expr.length){
		if(expr.charAt(i).isNaN()){
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
	return out
}

function ShuntingYard(expr){
	let stk1=[],
		stk2=[]

}


