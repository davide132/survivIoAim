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
		if(!game.scope.ge.keys["70"]) {
			setTimeout(function() {
				game.scope.ge.keys["70"] = true;
				setTimeout(function() {
					delete game.scope.ge.keys["70"]
				}, 90);
			}, 0);
		}
	}

	var pickupLoot = function() {
		if(game.scope.Oe.dt() && game.scope.Oe.dt().active) {
			if(	/mm/.test(game.scope.Oe.dt().name) ||
				/12gauge/.test(game.scope.Oe.dt().name) ||
				/50AE/.test(game.scope.Oe.dt().name) ||
				/bandage/.test(game.scope.Oe.dt().name) ||
				/soda/.test(game.scope.Oe.dt().name) ||
				/painkiller/.test(game.scope.Oe.dt().name) ||
				/smoke/.test(game.scope.Oe.dt().name) ||
				/frag/.test(game.scope.Oe.dt().name) ||
				/healthkit/.test(game.scope.Oe.dt().name)) {

				var ownBagIndex = !!game.scope.$e.j.backpack ? parseInt(game.scope.$e.j.backpack.slice(-2), 10) : 0;
				var bagSize = bagSizes[game.scope.Oe.dt().name][ownBagIndex];

				if(game.scope.$e.N.inventory[game.scope.Oe.dt().name] !== bagSize) {
					pressF();
				}
				return;
			}

			if(/scope/.test(game.scope.Oe.dt().name)) {
				var scopeLevel = parseInt(game.scope.Oe.dt().name.slice(0, -6), 10);
				if(!game.scope.$e.N.inventory[game.scope.Oe.dt().name]) {
					pressF();
				}
				return;
			};

			/*
				helmet01
				chest01
				backpack01
			*/
			if(	/helmet/.test(game.scope.Oe.dt().name) ||
				/chest/.test(game.scope.Oe.dt().name) ||
				/backpack/.test(game.scope.Oe.dt().name)) {

				var lootname = game.scope.Oe.dt().name.slice(0, -2);
				var lootLevel = parseInt(game.scope.Oe.dt().name.slice(-2), 10);

				if(!game.scope.$e.j[lootname]) {
					pressF();
					return;
				};

				var ownLootLevel = parseInt(game.scope.$e.j[lootname].slice(-2), 10);
				if( ownLootLevel < lootLevel) {
					pressF();
				}
				return;
			};

			/*
				Guns and skins
			*/
			if(game.scope.$e.N.weapons[0].name == "" ||
			   game.scope.$e.N.weapons[1].name == "") {
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