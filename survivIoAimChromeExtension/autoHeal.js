window.autoLoot = function(game) {

	var binded = false;
	var presskey = function(key) {
		if(!game.scope.fe.keys[key]) {
			setTimeout(function() {
				game.scope.fe.keys[key] = true;
				setTimeout(function() {
					delete game.scope.fe.keys[key]
				}, 90);
			}, 0);
		}
	}

	var bind = function() {
        heal();
		binded = true;
	}

	var unbind = function() {
		lootBarn.prototype.l = defaultLootBarnUpdateFunction;
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