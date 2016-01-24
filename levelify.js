'use strict';

var Leveler = class {
  /**
   * constructor
   **/
  constructor (inputText, levels) {
    var self = this;
    self.counter = [0,0]
    self.inputText = inputText.trim();
    self.levels = self.setLevels(levels); // Set the level definition for the Leveler
    var l = self.getLevelsFromText();
    self.results = self.convert(l);
  }

  /**
   * setLevels
   **/
  setLevels(levels) {
    if (!levels) {
      // TODO: Define default level definition
      // Presumably 1.0, 1.1, 1.1.1, because that's how contracts typically roll
      return "hello"
    }
    else {
      // TODO: Need to validate that the levels definition is valid
    }
    return levels;
  }

  /**
   * getLevelsFromText
   *
   * expected results look like:
   * [
   *   {'depth':1,'text':'This is a test'},
   *   {'depth':0, 'text':'This is just plain text.'},
   *   {'depth':2,'text':'This is also a test.'},
   *   {'depth':0,'text':'This is also plain text.'},
   *   {'depth':2,'text':'Super cool leveling is neat.'},
   *   {'depth':1,'text':'WOOO!'}
   * ]
   *
   **/
  getLevelsFromText() {
    var re = /^((l)+)\.\s(.*)/;
    return this.inputText.split('\n').map(function (d){
      var level = {};
      var depth = re.exec(d);
      if (depth) {
        level["depth"] = depth[1].length;
        level["text"] = depth[depth.length - 1];
      }
      else {
        level["depth"] = 0;
        level["text"] = d;
      }
      return level;
    });
  }

  /**
   * convert
   **/
  convert (depth){
    var self = this;
    // Take the level definition
    // Iterate through the depths, convert the depth to match the level definition, and iterate on that definition
    var res = depth.map(function (d){
      var i = d["depth"]
      if (i > 0){
        self.iterate(i)
        var header = ""
        for (var j = 1; j <= i; j++) {
          header += self.counter[j-1] + "."
        }
        return header + " " + d["text"]
      }
      return d["text"]
    })
    return res.join('\n');
  }

  iterate (i) {
    if (!this.counter[i-1]) {
      return this.counter[i-1] = 1
    }
    return this.counter[i-1] += 1;
  }
}

module.exports = Leveler;
