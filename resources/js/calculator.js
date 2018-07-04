var calculator = (function(){
	this.display = document.querySelector("#display")
	this.showError = document.querySelector("#notice")
	this.panel = document.querySelector("#key")

	this.storage = new Storage()
	this.view = new HTMLview({display:this.display,showError:this.showError})
	this.controller = new Controller({
		storage:this.storage,
		panel:this.panel,
		view:this.view
		})
})();



