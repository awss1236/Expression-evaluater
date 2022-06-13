function Token(type,value){
	this.type=type
	this.value=value
}
let NodeID=0

class TreeNode{
	constructor(val){
		this.value=val
		this.left
		this.right
		this.id
		if(val.type==TokenType.operation)
			this.id=String(val.value).charAt(0)+"_"+NodeID++
		else
			this.id=val.value+"_"+NodeID++
	}
}

const TokenType={operation:0,number:1,openparen:2,closeparen:3};

function Eval(){
	NodeID=0
	let inp=document.getElementById("Input"),
		out=document.getElementById("Output")
	console.log('Evaluating ...')
	if(inp.value==""){
		out.innerHTML="Err:Empty expression"
		return
	}
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
	let out=[],
		CurIndex=0
	while(CurIndex<expr.length){
		let CurChar=expr.charAt(CurIndex)
		if(isNumber(CurChar)){
			let num=0
			while(isNumber(CurChar)){
				num=num*10+Number(CurChar)
				CurIndex++
				CurChar=expr.charAt(CurIndex)
			}
			out.push(new Token(TokenType.number,num))
		}else{
			switch(CurChar){
				case "+":
					out.push(new Token(TokenType.operation,"+2"))
					break
				case "-":
					out.push(new Token(TokenType.operation,"-2"))
					break
				case "*":
					out.push(new Token(TokenType.operation,"*3"))
					break
				case "/":
					out.push(new Token(TokenType.operation,"/3"))
					break
				case "(":
					out.push(new Token(TokenType.openparen, "¯\\_(ツ)_/¯"))
					break
				case ")":
					out.push(new Token(TokenType.closeparen,"¯\\_(ツ)_/¯"))
					break
			}
			CurIndex++
		}
	}
	return out
}

function ShuntingYard(expr){
	let out=[],
		opestack=[]
	let lastope
	expr.forEach(Token=>{
		switch(Token.type){
			case TokenType.openparen:
				opestack.push(Token)
				break


			case TokenType.number:
				out.push(Token)
				break


			case TokenType.operation:
				lastope=opestack[opestack.length-1]
				while(lastope&&lastope.type==TokenType.operation&&Token.value.charAt(1)<=lastope.value.charAt(1)){
					out.push(opestack.pop())
					lastope=opestack[opestack.length-1]
				}
				opestack.push(Token)
				break


			case TokenType.closeparen:
				lastope=opestack[opestack.length-1]
				while(lastope.type!=TokenType.openparen){
					out.push(opestack.pop())
					lastope=opestack[opestack.length-1]
				}
				opestack.pop()
				let next=opestack.pop()
				if(next)
					out.push(next)
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
	expr.forEach(Token=>{
		if(Token.type==TokenType.openparen){
			Token.type=TokenType.closeparen
		}else if(Token.type==TokenType.closeparen){
			Token.type=TokenType.openparen
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
		out+=root.id
		out+=" "
		out+=root.left.id
		out+="<br>"
		out+=GenVisCode(root.left)
		if(root.right){
			out+=root.id
			out+=" "
			out+=root.right.id
			out+="<br>"
			out+=GenVisCode(root.right)
		}
	}
	return out
}