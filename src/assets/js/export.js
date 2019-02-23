var str = require("underscore.string");

export function exportPuzzle(puzzle) {
  let name = str(puzzle.name).trim().underscored().value();
  let data = "";

  return {body:data, name: name};
}