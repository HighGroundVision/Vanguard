const VDF = require("vdfplus");
const str = require("underscore.string");
const clone = require('clone');

export function exportPuzzle(puzzle) {
  let name = str(puzzle.name).trim().underscored().value();

  let sections = {};
  for (let i = 0; i < puzzle.matches.length; i++) {
    const match = puzzle.matches[i];

    let actor_player = {
      use_deck: match.player.decks.length == 1 ? match.player.decks[0].code : "",
      allow_user_decks: match.player.mode == "2" ? "1" : "0",
      additional_decks: {},
      validator: {}
    };

    for (let d = 0; d < match.player.decks.length; d++) {
      const deck = match.player.decks[d];
      let additional_deck = {
        name: deck.name,
        code: deck.code,
        description: "",
        tags: ""
      };
      actor_player.additional_decks[`player_deck${d}`] = additional_deck;
    }

    let actor_ai = {
      use_deck: match.player.decks.length == 1 ? match.player.decks[0].code : "",
      allow_user_decks: match.player.mode == "2" ? "1" : "0",
      additional_decks: {},
      validator: {}
    };

    for (let d = 0; d < match.ai.decks.length; d++) {
      const deck = match.ai.decks[d];
      let additional_deck = {
        name: deck.name,
        code: deck.code,
        description: "",
        tags: ""
      };
      actor_player.additional_decks[`ai_deck${d}`] = additional_deck;
    }

    var section = {
      rules: {
        deck_player: actor_player,
        deck_ai: actor_ai,
        set1: "1",
      },
      sequences: {}
    };

    

    // SETUP
    // Time
    section.rules["no_shotclock"] = match.rules.clock.no_shotclock ? "1" : "0";
    section.rules["shotclock_base_time"] = match.rules.clock.shotclock_base_time;
    // Deployment - Heroes
    if(match.player.rules.flop.mode == "1")  {
      section.rules["heroes_initial_lane_random"] = "1";
      section.rules["initial_heroes"] = match.player.rules.flop.heroes;
    } else if(match.player.rules.flop.mode == "2")  {
      section.rules["heroes_initial_lane_random"] = "0";
      section.rules["initial_heroes"] = match.player.rules.flop.heroes;
    } else if(match.player.rules.flop.mode == "3")  {
      section.rules["hero1_player"] = match.player.rules.flop.lane_1;
      section.rules["hero2_player"] = match.player.rules.flop.lane_2;
      section.rules["hero3_player"] = match.player.rules.flop.lane_3;
    }
    if(match.ai.rules.flop.mode == "1")  {
      section.rules["heroes_initial_lane_random"] = "1";
      section.rules["initial_heroes_ai"] = match.ai.rules.flop.heroes;
    } else if(match.ai.rules.flop.mode == "2")  {
      section.rules["heroes_initial_lane_random"] = "0";
      section.rules["initial_heroes_ai"] = match.ai.rules.flop.heroes;
    } else if(match.ai.rules.flop.mode == "3")  {
      section.rules["hero1_ai"] = match.ai.rules.flop.lane_1;
      section.rules["hero2_ai"] = match.ai.rules.flop.lane_2;
      section.rules["hero3_ai"] = match.ai.rules.flop.lane_3;
    }
    // Deployment - Creeps
    section.rules["pathing_force"] = match.rules.deployment.pathing_force;
    section.rules["creeps_first_turn"] = match.player.rules.creeps.count;
    section.rules["creep_list"] = match.player.rules.creeps.list.map(_ => _.id).join();
    section.rules["creeps_first_turn_ai"] =  match.ai.rules.creeps.count;
    section.rules["creep_list_ai"] = match.ai.rules.creeps.list.map(_ => _.id).join();
    section.rules["creeps_lanes_player_1each"] = match.rules.deployment.mode == "1" ? "1" : "0";
    section.rules["creeps_lanes_random"] =  match.rules.deployment.mode == "2" ? "0" : "1";
    section.rules["only_flop_across_from_heroes"] = match.rules.deployment.mode == "3" ? "1" : "0";
    // Towers / Ancients
    section.rules["tower1_health"] = match.player.rules.towers.lane_1;
    section.rules["tower2_health"] = match.player.rules.towers.lane_2;
    section.rules["tower3_health"] = match.player.rules.towers.lane_3;
    section.rules["tower1_health_ai"] = match.ai.rules.towers.lane_1;
    section.rules["tower2_health_ai"] = match.ai.rules.towers.lane_2;
    section.rules["tower3_health_ai"] = match.ai.rules.towers.lane_3;
    section.rules["ancient1_health"] = match.player.rules.ancient.lane_3;
    section.rules["ancient2_health"] = match.player.rules.ancient.lane_3;
    section.rules["ancient3_health"] = match.player.rules.ancient.lane_3;
    section.rules["ancient1_health_ai"] = match.ai.rules.ancient.lane_3;
    section.rules["ancient2_health_ai"] = match.ai.rules.ancient.lane_3;
    section.rules["ancient3_health_ai"] = match.ai.rules.ancient.lane_3;
    section.rules["initial_mana"] = match.player.rules.mana;
    section.rules["initial_mana_ai"] = match.ai.rules.mana;
    // Library
    section.rules["cards_first_turn"] = match.player.rules.library.draw;
    section.rules["cards_first_turn_ai"] = match.ai.rules.library.draw;
    if(match.player.rules.library.order.length > 0) {
      section["deck_order_player"] =  {
        draw: match.player.library.order.map(_ => _.id)
      };
    }
    if(match.ai.rules.library.order.length > 0) {
      section["deck_order_ai"] =  {
        draw: match.ai.library.order.map(_ => _.id)
      };
    }
    // Combat
    section.rules["ai_pass_chance_multiplier"] = match.rules.combat.ai_pass_chance_multiplier;
    section.rules["ai_action_choice_non_random"] = match.rules.combat.ai_action_choice_non_random;
    // Shopping
    section.rules["store_enabled"] = match.rules.store.enabled ? "1" : "0";
    if(match.player.rules.store.order.length > 0) {
      section.rules["shop_order"] =  match.player.rules.store.order.map(_ => _.id)
    }
    if(match.rules.store.secret != 0) {
      section.rules["secretshop_force"] = match.rules.store.secret;
    }
    // Victory
    if(match.rules.victory.gold_flag) {
      section.rules["gold_victory"] = match.rules.victory.gold_amount;
    }
    if(match.rules.victory.units_flag) {
      section.rules["units_victory"] = match.rules.victory.units_amount;
    }
    if(match.rules.victory.kills_flag) {
      section.rules["kills_victory"] = match.rules.victory.kills_amount;
    }

    // TURNS
    // Extras
    section.rules["mana_boost_per_turn"] = match.player.rules.turn.mana;
    section.rules["gold_per_turn"] = match.player.rules.turn.gold;
    section.rules["mana_boost_per_turn_ai"] = match.ai.rules.turn.mana;
    section.rules["gold_per_turn_ai"] = match.ai.rules.turn.gold;
    // Cards
    section.rules["cards_per_turn"] = match.player.rules.turn.draw;
    section.rules["cards_per_turn_ai"] = match.ai.rules.turn.draw;
    section.rules["free_cards_per_turn"] = match.player.rules.turn.free.map(_ => _.id).join();
    section.rules["free_cards_per_turn_ai"] = match.ai.rules.turn.free.map(_ => _.id).join();
    // Creeps
    section.rules["creeps_per_turn"] = match.player.rules.turn.creeps;
    section.rules["creeps_per_turn_ai"] = match.ai.rules.turn.creeps;

    // Flow
    if( match.sequence.flows.length > 0) {
      match.sequence.flows.sort(function(lhs, rhs) { return (lhs.turn == rhs.turn) ? rhs.lane - lhs.lane : rhs.turn - lhs.turn; });
      let max_turns = match.sequence.flows[0].turn + 1;
      let flow = [];
      for (let t = 1; t <= max_turns; t++) {
        for (let l = 1; l <= 3; l++) {
          flow.push({ turn:t,lane:l });
        }
      }
      for (let s=0, f=1; s < flow.length; s++,f++) {
        let sequence = {};
        let events = [];

        if(f < flow.length ) {
          let next = `turn${flow[f].turn}lane${flow[f].lane}`;
          sequence["on_next_lane"] = `goto ${next}`;
        }

        let current = `turn${flow[s].turn}lane${flow[s].lane}`;
        section.sequences[current] = sequence;
      }
    }

    sections[`part${i}`] = section;
  }

  let data = {};
  data[`${name}`] = {
    name: puzzle.name,
    description: puzzle.description,
    sections: sections
  };

  let vdf = VDF.stringify(data);
  return {body:vdf, name: name};
}