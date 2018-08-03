window.autoHeal = function(game, variables) {

	var key = variables.key;
	var binded = false;
	var timer = null;

	var pressKey = function(key) {
		if(!game.scope.xe.keys[key]) {
			setTimeout(function() {
				game.scope.xe.keys[key] = true;
				setTimeout(function() {
					delete game.scope.xe.keys[key]
				}, 90);
			}, 0);
		}
	}

	var isNoEnemy = function() {
		if(!game.scope.Me._t[game.scope.ce]) return false;

		var selfTeamId = game.scope.Me._t[game.scope.ce].teamId;
		var selfId = game.scope.ce;
		var playerIds = Object.keys(game.scope.Me._t);

		for(var i = 0; i < playerIds.length; i++) {
			if( game.scope.rt.idToObj[playerIds[i]] && 
				(!game.scope.rt.idToObj[playerIds[i]].q.dead) && 
				(!game.scope.rt.idToObj[playerIds[i]].q.downed) &&
				game.scope.Me._t[playerIds[i]].teamId != selfTeamId) {
				
				return false;
			}
		}

		return true;
	}

	var isNoMotion = function() {
		if(	game.scope.we.keys[key.W] ||
			game.scope.we.keys[key.D] ||
			game.scope.we.keys[key.S] ||
			game.scope.we.keys[key.A]) {

			return false;
		}

		return true;
	}

	var heal = function() {
		if(isNoEnemy() && isNoMotion()) {
			if(game.scope.st.U.health < 30) {
				if(game.scope.st.U.inventory["healthkit"] > 0 ) {
					pressKey(key.Eight);
					return;
				}
			}

			if(game.scope.st.U.health < 70) {
				if(game.scope.st.U.inventory["bandage"] > 0 ) {
					pressKey(key.Seven);
					return;
				}
			}

			if(game.scope.st.U.boost < 50) {
				if(game.scope.st.U.inventory["painkiller"] > 0 ) {
					pressKey(key.Zero);
					return;
				}
			}

			if(game.scope.st.U.boost < 75) {
				if(game.scope.st.U.inventory["soda"] > 0 ) {
					pressKey(key.Nine);
					return;
				}
			}
		}
	}

	var runHeal = function() {
		heal();
		timer = setTimeout(runHeal, 1000);
	}

	var stopHeal = function() {
		clearTimeout(timer);
		timer = null;
	}	

	var bind = function() {
		runHeal();
        binded = true;
	}

	var unbind = function() {
		stopHeal();
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
