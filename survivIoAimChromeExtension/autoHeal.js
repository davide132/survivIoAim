window.autoLoot = function(game) {

	var binded = false;
	var presskey = function(key) {
		if(!game.scope.xe.keys[key]) {
			setTimeout(function() {
				game.scope.xe.keys[key] = true;
				setTimeout(function() {
					delete game.scope.xe.keys[key]
				}, 90);
			}, 0);
		}
	}

	var bind = function() {
        heal();
		binded = true;
	}

	var unbind = function() {
		binded = false;
	}

	var isBinded = function() {
		return binded;
	}

	return {
		bind: bind,
		unbind: unbind,
		isBinded: isBinded
	}
}
