
var Controller = function(param){
	this.storage = param.storage
	this.panel = param.panel
	this.view = param.view
	this.seq = param.storage.seq
	
	this.listen()
}

Controller.prototype.listen = function(){
	console.log("Setting up controller...")
	console.log("********************************")
	var control = this 
	//This is to set/differentiate this(Controller) and this(HTMLDIVelement)
	//when event handler is triggered
	this.panel.addEventListener("click", function(event){
		console.log("Controller: last eval? "+control.storage.lastEval)
		var eval = new Evaluator({
			click: true,
			key : event.target.childNodes[0].nodeValue,
			seq : control.storage.seq,
			lastEval : control.storage.lastEval
		})
		control.apply(eval.result)
	}, true)
		
	document.addEventListener("keydown", function(event){
		var eval = new Evaluator({
			shift: event.shiftKey,
			key : event.keyCode,
			seq : control.storage.seq,
			lastEval : control.storage.lastEval
		})
		control.apply(eval.result)
	}, true)
}

Controller.prototype.apply = function(result){
	// lastEval:false,
	// extend:false,
	// lastTerm:""
	switch (result.operation){
		case "backspace":
			this.storage.backspace()
			this.view.update(this.storage.seq.join(" "))
			break
		case "clean":
			if (this.storage.lastEval){
				this.storage.clean()
				this.view.clean()
				this.storage.lastEval = false
			}break
		case "error":
			this.view.error()
			break
		case "extend":
			this.storage.extend(result.newItem)
			this.view.update(this.storage.seq.join(" "))
			break
		case "replace":
			this.storage.replace(result.newItem)
			this.view.update(this.storage.seq.join(" "))
			break
		case "result":
			this.storage.result(result.newItem)
			this.view.update(this.storage.seq.join(" "))
			break
	}
}


