
var Storage = function(){

	this.seq = new Array("0")
	this.lastEval = new Boolean()

	this.extend = function(item){ //push value into storage sequence
		for (var i=0;i<item.length;i++){
			if(Array.isArray(item[i])){
				for (var j=0;j<item[i].length;j++){
					this.seq.push(item[i][j])
				}
			}else this.seq.push(item[i])
		}
		if(this.lastEval)this.lastEval=false
	}

	this.replace = function(item){ //substitute the last value(not char) in array with new one
		this.seq.pop()
		this.extend(item)
		if(this.lastEval)this.lastEval=false
	}

	this.backspace = function(){ //remove the last character
		var lastTerm = this.seq[this.seq.length-1]
		if (lastTerm.length>1){
			this.seq[this.seq.length-1] = lastTerm.slice(0,-1)
		}else if (this.seq.length==1){
			this.seq[0]="0"
		}else {
			this.seq.pop()
		}
		if(this.lastEval)this.lastEval=false
	}

	this.result = function(input){
		if(input.length>0){
			this.seq = new Array(input.toString())
			this.lastEval = true
		}
	}

	this.clean = function(){ //remove everything inside storage sequence
		this.seq = new Array("0")
		console.log("storage clean: "+this.seq.join())
	}

}

function obtainLast(i,n){ // obtain the last value in any array
	//i must be an array, n(optional) specify the nth last term
	var last = i[i.length-1] === 0 ? 0 : i[i.length-1]
	if (Array.isArray(last)) return obtainLast(last)
	else {
		if(n){
			if(i.length>(n-1)){
				if(Array.isArray(i[i.length-n])){
					return null
				} else {
					return i[i.length-n]
				}
			} else {
				console.log("Storage: Terms not existed")
				return null
			}
		} else {
			return last
		}
	}
}

