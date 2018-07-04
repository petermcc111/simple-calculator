
var HTMLview = function(param){
	this.display = param.display
	this.showError  = param.showError
	this.displayProp = {
		style:{}
	}
	this.showErrorProp = {
		normal:{visibility:"hidden"},
		error:{visibility:"visible"}
	}
	this.HTMLout()

	this.update = function(key){
		key = key.replace(/\*/g,"×")
		key = key.replace(/\//g,"÷")
		this.HTMLout(key)
		this.removeErrorEffect()
	}

	this.clean = function(){
		this.HTMLout("")
		this.removeErrorEffect()
	}

	this.error = function(){
		console.log(this.error)
		this.showError.style.visibility = "visible"
		this.errorEffect = true
	}

	this.removeErrorEffect = function(){
		if(this.errorEffect){
			this.showError.style.visibility = "hidden"
			this.errorEffect = false
		}
	}
}

HTMLview.prototype.HTMLout = function(key){
	if(!key)key=`0`
	ReactDOM.render(
		React.createElement('div', this.displayProp, key),
		this.display
	)
}
