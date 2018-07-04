var Evaluator = function(param){
	console.log("****Entering evaluation environment****")

	// param included:
	this.seq = param.seq
	this.key = param.key
	this.click = param.click
	this.shift = param.shift
	this.lastEval = param.lastEval
	console.log("Current sequence: "+this.seq.join())

	//the last item in the array sequence
	this.lastItem = obtainLast(param.seq)
	this.secondLstTerm = obtainLast(param.seq,2)
	this.result = {
		operation:false,
		newItem:[]
	}

	//switch between mouseclick event or keyboard event
	this.click?this.clickEvent(this.key):this.keyboardEvent(this.key,this.shift)
}

// deal with input 0-9
Evaluator.prototype.fnum = function(input){
	var lastItem = this.lastItem
	// last term does not have %
	if (!/[%]/.test(lastItem)){
		//remove any answer values

		if(this.lastEval===true){
			//here lastEval has some tricky cases - 
			//lastEval is boolean with value "false", but when test this value
			//in conditional statement, the system consider lastEval as
			//new Boolean(false), so the object exists and become true
			//see https://stackoverflow.com/questions/36709116/logical-not-on-boolean-object-always-return-false-in-javascript
			this.apply("replace",input)
		}
		// last term is +-*/
		else if (/[+\-*/]/.test(lastItem))this.apply("extend",input)
		else {// last term is a number or .(dot)
			// use "0"(string) instead of 0(number)
			var beforeItem = (lastItem && lastItem !== "0")? lastItem : ""
			this.apply("replace",(beforeItem + "" + input))
		}
	}
}

Evaluator.prototype.fope = function(input){// for operator +-*/
	console.log("operator evaluation")
	var lastItem = this.lastItem

	// finding excluding cases
	var exclude = [input,"*-","/-"].find(function(i){return i===lastItem})
	if (!exclude) {
		switch(input){
			case "-":
				// last term is +
				if (lastItem.match(/\+/)){ 
					this.apply("replace",input)
					break}

				// last term is */
				else if (lastItem.match(/[*/]/)){ 
					this.apply("replace",lastItem + input)
					break}
			case "+": 
			case "*":
			case "/":
				// last term is +-*/
				if (/[+\-*/]/.test(lastItem)){this.apply("replace",input);break}

			// default case: any operator with last term .(dot) / % / any number
			default:this.apply("extend",input)
		}
	}
}

Evaluator.prototype.fmod = function(input){ //for .(dot) and %(percentage)
	var lastItem = this.lastItem
	console.log("dot evaluation")
	switch(input){
		case ".":
			if (!/[%.]/.test(lastItem)) {// last term does not have % or .(dot)
				// whether last item is operator or else(e.g. a number)
				if(lastItem.match(/[\+\-\*\/]/))this.apply("extend","0.")
				else this.apply("replace",lastItem +".")
			}break
		case "%":
			var ope = /[+\-*/\(]/.test(lastItem)
			//var ope = ["*-","/-","+","-","*","/","("].find(function(i){return i===lastItem})
			// last term does not have has operator
			if (!ope) this.apply("replace",lastItem + "%")
	}
}

Evaluator.prototype.fpak = function(input){// for parentheses ( )
	var lastItem = this.lastItem
	switch (input){
		case "(":
			//add multiplicaiton sign if last item is ) or % or 0-9 excluding "0"
			if (this.seq.length===1 && lastItem==="0") this.apply("replace","(")
			else if (!isNaN(lastItem)|| /[)%]/.test(lastItem)) this.apply("extend",["*","("])
			else this.apply("extend","(")
			break
		case ")": this.apply("extend",")")
	}
}

Evaluator.prototype.calculate = function(){
	if(!this.lastEval){
		var con = this.seq.join("").replace(/\%/g,"/100")
		console.log("Evaluating results")
		try{var evalResult = eval(con)}catch(e){console.log("Error calculation: "+e)}
		if (evalResult){
			var finalResult = evalResult === Infinity ? "∞" :parseFloat(evalResult.toPrecision(12))
			this.apply("result",finalResult)
		} else this.apply("error")
	}
}

Evaluator.prototype.back = function(){
	this.apply("backspace")
}

Evaluator.prototype.apply = function(method,newItem){
	this.result.newItem.push(newItem)
	this.result.operation = method
}

//mouseclicking event lists
Evaluator.prototype.clickEvent = function(key){
	switch(key){
		case "+":this.fope("+");break
		case "-":this.fope("-");break
		case "×":this.fope("*");break
		case "÷":this.fope("/");break
		case ".":this.fmod(".");break
		case "%":this.fmod("%");break
		case "(":this.fpak("(");break
		case ")":this.fpak(")");break
		case "=":this.calculate();break
		case "0":this.fnum("0");break
		case "1":this.fnum("1");break
		case "2":this.fnum("2");break
		case "3":this.fnum("3");break
		case "4":this.fnum("4");break
		case "5":this.fnum("5");break
		case "6":this.fnum("6");break
		case "7":this.fnum("7");break
		case "8":this.fnum("8");break
		case "9":this.fnum("9");break
		case "C":this.back();break
	}
}

//keyboard event lists (key:event.keyCode)
Evaluator.prototype.keyboardEvent = function(key,shifted){
	switch(key){
		case 48:shifted?this.fpak(")"):this.fnum("0");break
		case 49:this.fnum("1");break
		case 50:this.fnum("2");break
		case 51:this.fnum("3");break
		case 52:this.fnum("4");break
		case 53:shifted?this.fmod("%"):this.fnum("5");break
		case 54:this.fnum("6");break
		case 55:this.fnum("7");break
		case 56:shifted?this.fope("*"):this.fnum("8");break
		case 57:shifted?this.fpak("("):this.fnum("9");break
		case 61:shifted?this.fope("+"):this.calculate();break
		case 96:this.fnum("0");break
		case 97:this.fnum("1");break
		case 98:this.fnum("2");break
		case 99:this.fnum("3");break
		case 100:this.fnum("4");break
		case 101:this.fnum("5");break
		case 102:this.fnum("6");break
		case 103:this.fnum("7");break
		case 104:this.fnum("8");break
		case 105:this.fnum("9");break
		case 107:this.fope("+");break
		case 109:this.fope("-");break
		case 173:this.fope("-");break
		case 106:this.fope("*");break
		case 111:this.fope("/");break
		case 191:this.fope("/");break
		case 13:this.calculate();break
		case 110:this.fmod(".");break
		case 190:this.fmod(".");break
		case 8:this.back();break//backspace
	}
}
