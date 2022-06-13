function token(type,value){
	this.type=type
	this.value=value
}


class TreeNode{
	constructor(val){
		this.value=val
		this.left
		this.right
	}
}

const TokenType={operation:0,number:1,openparen:2,closeparen:3};

function Eval(){
	let inp=document.getElementById("Input"),
		out=document.getElementById("Output")
	console.log('Evaluating ...')
	let root=ConstructTree(InfixToPrefix(Lex(inp.value)))
	out.innerHTML=GenVisCode(root)
}

function isNumber(char){
	if(char.trim()==""){
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
					out.push(new token(TokenType.number,curnum))
					out.push(new token(TokenType.operation,"+2"))
					curnum=0
					break
				case "*":
					out.push(new token(TokenType.number,curnum))
					out.push(new token(TokenType.operation,"*3"))
					curnum=0
					break
				case "-":
					out.push(new token(TokenType.number,curnum))
					out.push(new token(TokenType.operation,"-2"))
					curnum=0
					break
				case "/":
					out.push(new token(TokenType.number,curnum))
					out.push(new token(TokenType.operation,"/3"))
					curnum=0
					break
				case "(":
					out.push(new token(TokenType.number,curnum))
					out.push(new token(TokenType.openparen,"¯\_(ツ)_/¯"))
					curnum=0
					break
				case ")":
					out.push(new token(TokenType.number,curnum))
					out.push(new token(TokenType.closeparen,"¯\_(ツ)_/¯"))
					curnum=0
					break
				
			}
		}else{
			curnum=curnum*10+Number(expr.charAt(i))
		}
	}
	out.push(new token(TokenType.number,curnum))
	return out
}

function ShuntingYard(expr){
	let out=[],
		opestack=[]

	expr.forEach(token=>{
		switch(token.type){
			case TokenType.openparen:
				opestack.push(token)
				break


			case TokenType.number:
				out.push(token)
				break


			case TokenType.operation:
				let lastope=opestack[opestack.length-1]
				while(lastope&&token.value.charAt(1)<=lastope.value.charAt(1)){
					out.push(opestack.pop())
					lastope=opestack[opestack.length-1]
				}
				opestack.push(token)
				break


			case TokenType.closeparen:
				let lastope=opestack[opestack.length-1]
				while(lastope.type!=TokenType.openparen){
					out.push(opestack.pop())
					lastope=opestack[opestack.length-1]
				}
				opestack.pop()
				out.push(opestack.pop())
				break
		}
	})
	let temp=opestack.length
	for(let i=0;i<temp;i++){
		out.push(opestack.pop())
	}
	return out
}

function InfixToPrefix(expr_){
	let expr=expr_.slice()
	expr.reverse()
	expr.forEach(token=>{
		if(token.type==TokenType.openparen){
			token.type=TokenType.closeparen
		}else if(token.type==TokenType.closeparen){
			token.type=openparen
		}
	})
	let out=ShuntingYard(expr)
	return out.reverse()
}

function ConstructTree(expr){
	let out=new TreeNode(expr.shift())
	if(out.value.type==TokenType.operation){
		out.left=ConstructTree(expr)
		out.right=ConstructTree(expr)
	}
	return out
}
function GenVisCode(root){
	let out=""
	if(root.left){
		out+=root.value.value
		out+=" "
		out+=root.left.value.value
		out+="<br>"
		out+=GenVisCode(root.left)
		if(root.right){
			out+=root.value.value
			out+=" "
			out+=root.right.value.value
			out+="<br>"
			out+=GenVisCode(root.right)
		}
	}
	return out
}