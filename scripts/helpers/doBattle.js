/**
 * One pokemon attacking the other in combat
 * @param {object} attackingPoke
 * @param {object} defendingPoke
 * @return {object} The pokemon winner and loser
 */
module.exports = (attackingPoke, defendingPoke) => {
  let tempObjectHolder = {};
  let currAttackingPoke = attackingPoke;
  let currDefendingPoke = defendingPoke;
  while (true) {
    // figure out if the attacking pokemon is physical or special
    const attackStat =
      currAttackingPoke.atk > currAttackingPoke.spatk ? "atk" : "spatk";

    // Calculate type modifiers
    const currAttackingPokeType2 = currAttackingPoke.types[1]
      ? currAttackingPoke.types[1].pokeType
      : null;
    const currDefendingPokeType1 = currDefendingPoke.types[0].pokeType;
    const currDefendingPokeType2 = currDefendingPoke.types[1]
      ? currDefendingPoke.types[1].pokeType
      : null;
    const type1Modifiers = currAttackingPoke.types[0].damageTo
      .filter(
        x =>
          x.pokeType === currDefendingPokeType1 ||
          x.pokeType === currDefendingPokeType2
      )
      .reduce((total, num) => total.mod * num.mod);

    // If the attacker has a second type, do it all again
    let type2Modifiers = 1;
    if (currAttackingPokeType2) {
      type2Modifiers = currAttackingPoke.types[1].damageTo
        .filter(
          x =>
            x.pokeType === currDefendingPokeType1 ||
            x.pokeType === currDefendingPokeType2
        )
        .reduce((total, num) => total.mod * num.mod);
    }

    // Finally get the total type total
    const totalTypeModifier =
      (typeof type1Modifiers === "object"
        ? type1Modifiers.mod
        : type1Modifiers) *
      (typeof type2Modifiers === "object"
        ? type2Modifiers.mod
        : type2Modifiers);

    // Calculate damage with all of the modifiers
    const damage =
      (currAttackingPoke[attackStat] /
        (attackStat === "atk"
          ? currDefendingPoke.def
          : currDefendingPoke.spdef)) *
        0.5 *
        currAttackingPoke[attackStat] *
        0.2 *
        totalTypeModifier +
      1;
    // Subtract that damage from the health of the defending pokemon
    currAttackingPoke.damage = damage.toFixed(0);
    currDefendingPoke.hp = currDefendingPoke.hp.toFixed(0) - damage.toFixed(0);
    if (currDefendingPoke.hp <= 0) {
      return { loser: currDefendingPoke, winner: currAttackingPoke };
    } else {
      tempObjectHolder = currAttackingPoke;
      currAttackingPoke = currDefendingPoke;
      currDefendingPoke = tempObjectHolder;
    }
  }
};
