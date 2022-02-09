enum SymbolType{
	num=0,
	ope
}

interface Symbol{
	type:SymbolType;
	value:string;
}


function Eval(){
	let inp=document.getElementById("Input"),
		out=document.getElementById("Output")
	console.log('Evaluating ...')
	Parse("a w s s")
}


function Parse(expr){
	let out=[],
		nsexpr=expr.replace(/\s+/g, ''), //same expression without spaces

	for(let i=0;i<nsexpr.length;i++){
		if(nsexpr.charAt(i).isNaN()){
			//not a number

		}else{
			//is a digit
			
		}
	}
	
	for(let i=1;i<nsexpr.length;i++){
		switch(nsexpr.charAt(i)){
			case "+":
				if(lastsym)
		}


	}
}


