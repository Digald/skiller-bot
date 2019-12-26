/**
 * One pokemon attacking the other in combat
 * @param {object} attackingPoke
 * @param {object} defendingPoke
 * @return {object} The pokemon that lost the battle with no remaining hp
 */
const _doBattle = (attackingPoke, defendingPoke) => {
  console.log('battled');
  // figure out if the attacking pokemon is physical or special
  const attackStat = attackingPoke.atk > attackingPoke.spatk ? "atk" : "spatk";

  // Calculate type modifiers
  const attackingPokeType2 = attackingPoke.types[1].pokeType || null;
  const defendingPokeType1 = defendingPoke.types[0].pokeType;
  const defendingPokeType2 = defendingPoke.types[1].pokeType || null;
  const type1Modifiers = attackingPoke.types[0].damageTo
    .filter(
      x =>
        x.pokeType === defendingPokeType1 || x.pokeType === defendingPokeType2
    )
    .reduce((total, num) => total.mod * num.mod);

  // If the attacker has a second type, do it all again
  let type2Modifiers;
  if (attackingPokeType2) {
    type2Modifiers = attackingPoke.types[1].damageTo
      .filter(
        x =>
          x.pokeType === defendingPokeType1 || x.pokeType === defendingPokeType2
      )
      .reduce((total, num) => total.mod * num.mod);
  }

  // Finally get the total type total
  const totalTypeModifier = type1Modifiers * type2Modifiers;
  // Calculate damage with all of the modifiers
  const damage =
    (attackingPoke["attackStat"] /
      (attackStat === "atk" ? defendingPoke.def : defendingPoke.spdef)) *
    0.5 *
    0.1 *
    totalTypeModifier;

  // Subtract that damage from the health of the defending pokemon
  const remainingHp = defendingPoke.hp - damage;
  if (remainingHp <= 0) {
    return defendingPoke;
  } else {
    return () => _doBattle(defendingPoke, attackingPoke);
  }
};

const trampoline = fn => (...args) => {
  let res = fn(...args);
  while (typeof res === "function") {
    res = res();
  }
  return res;
};

module.exports = (attackingPoke, defendingPoke) =>
  trampoline(_doBattle(attackingPoke, defendingPoke));
