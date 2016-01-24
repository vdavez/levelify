'use strict';

String.prototype.replaceBetween = function(start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

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
      var levels = ["$1.0","$1.$1","$1.$1.$1."];
      // Presumably 1.0, 1.1, 1.1.1, because that's how contracts typically roll
      return levels
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
        header += self.applyLevel(i-1)
        return header + " " + d["text"]
      }
      return d["text"]
    })
    return res.join('\n');
  }

  /**
   *
   **/
  iterate (i) {
    if (!this.counter[i-1]) {
      return this.counter[i-1] = 1
    }
    return this.counter[i-1] += 1;
  }

  /**
   *
   **/
  parseLevel(j) {
    var re = /\$[1AaIi]/g;
    return this.levels[j].match(re)
  }

  /**
   *
   **/
  applyLevel(j) {
    var leveler = this.levels[j];
    var parsed = this.parseLevel(j);
    var re = /\$[1AaIi]/g;
    var idx;
    var out = leveler;
    var k = 0; // because we're losing the $, we have to account for the shorter string...
    while (idx = re.exec(leveler)) {  //this is
      var i = re.lastIndex - k;
      switch (parsed[k]) {
        case "$1":
          out = out.replaceBetween(i-2, i, this.counter[(j-parsed.length+k+1)]);
          break;
        case "$A":
          debugger;
          out = out.replaceBetween(i-2, i, String.fromCharCode(64+this.counter[(j-parsed.length+k+1)]));
          break;
        case "$a":
          out = out.replaceBetween(i-2, i, String.fromCharCode(64+this.counter[(j-parsed.length+k+1)]));
          break;

      }
      k++;
    }
    return out;
  }
}

module.exports = Leveler;
