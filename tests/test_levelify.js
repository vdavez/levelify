var test = require('tape');
var Leveler = require('../levelify');
var fs = require('fs');

var testData = fs.readFileSync('tests/testData.md','utf8');

test('Testing levelify', function (t){

  var opts = [{"form":"#$x.", "num": "I"},{"form":"$x.", "num": "A"},{"form":"($x)", "num": "1"}];
  var l = Leveler(testData, opts);

  t.deepEqual({out:'#I. This is a test\nThis is just plain text.\nA. This is also a test.\nThis is also plain text.\nB. Super cool leveling is neat.\n#II. WOOO!\n'}, l, 'Testing that levelify works.');
  t.end()
})
