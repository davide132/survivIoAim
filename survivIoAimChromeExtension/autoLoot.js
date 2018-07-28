window.autoLoot = function(game, variables) {

	var lootBarn = variables.lootBarn;
	var bagSizes = variables.bagSizes;
	var binded = false;

	if(!!!lootBarn || !!!bagSizes) {
		console.log("Cannot init autoloot");
		return;
	}

	/*
		var bagSizes = {
			"9mm": 			[120, 240, 330, 420],
		    "762mm": 		[90, 180, 240, 300],
		    "556mm": 		[90, 180, 240, 300],
		    "12gauge": 		[15, 30, 60, 90],
		    "50AE": 		[42, 84, 126, 168],
		    "frag": 		[3, 6, 9, 12],
		    "smoke": 		[3, 6, 9, 12],
		    "bandage": 		[5, 10, 15, 30],
		    "healthkit": 	[1, 2, 3, 4],
		    "soda": 		[2, 5, 10, 15],
		    "painkiller": 	[1, 2, 3, 4]
		}
	*/

	var pressF = function() {
		if(!game.scope.fe.keys["70"]) {
			setTimeout(function() {
				game.scope.fe.keys["70"] = true;
				setTimeout(function() {
					delete game.scope.fe.keys["70"]
				}, 90);
			}, 0);
		}
	}

	var pickupLoot = function() {
		if(game.scope.Ne.wt() && game.scope.Ne.wt().active) {
			if(	/mm/.test(game.scope.Ne.wt().name) ||
				/12gauge/.test(game.scope.Ne.wt().name) ||
				/50AE/.test(game.scope.Ne.wt().name) ||
				/bandage/.test(game.scope.Ne.wt().name) ||
				/soda/.test(game.scope.Ne.wt().name) ||
				/painkiller/.test(game.scope.Ne.wt().name) ||
				/smoke/.test(game.scope.Ne.wt().name) ||
				/frag/.test(game.scope.Ne.wt().name) ||
				/healthkit/.test(game.scope.Ne.wt().name)) {

				var ownBagIndex = !!game.scope.nt.q.backpack ? parseInt(game.scope.nt.q.backpack.slice(-2), 10) : 0;
				var bagSize = bagSizes[game.scope.Ne.wt().name][ownBagIndex];

				if(game.scope.nt.U.inventory[game.scope.Ne.wt().name] !== bagSize) {
					pressF();
				}
				return;
			}

			if(/scope/.test(game.scope.Ne.wt().name)) {
				var scopeLevel = parseInt(game.scope.Ne.wt().name.slice(0, -6), 10);
				if(!game.scope.nt.U.inventory[game.scope.Ne.wt().name]) {
					pressF();
				}
				return;
			};

			/*
				helmet01
				chest01
				backpack01
			*/
			if(	/helmet/.test(game.scope.Ne.wt().name) ||
				/chest/.test(game.scope.Ne.wt().name) ||
				/backpack/.test(game.scope.Ne.wt().name)) {

				var lootname = game.scope.Ne.wt().name.slice(0, -2);
				var lootLevel = parseInt(game.scope.Ne.wt().name.slice(-2), 10);

				if(!game.scope.nt.q[lootname]) {
					pressF();
					return;
				};

				var ownLootLevel = parseInt(game.scope.nt.q[lootname].slice(-2), 10);
				if( ownLootLevel < lootLevel) {
					pressF();
				}
				return;
			};

			/*
				Guns and skins
			*/
			if(game.scope.nt.U.weapons[0].name == "" ||
			   game.scope.nt.U.weapons[1].name == "") {
				pressF();
				return;
			}
		}
	}

	var defaultLootBarnUpdateFunction = function(e, t, a) {};
	var lootBarnUpdateContext = {};

	var bind = function() {
		defaultLootBarnUpdateFunction = lootBarn.prototype.l;
		lootBarn.prototype.l = function(e, t, a) {
			lootBarnUpdateContext = this;
			defaultLootBarnUpdateFunction.call(lootBarnUpdateContext, e, t, a);

			pickupLoot();
		}
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