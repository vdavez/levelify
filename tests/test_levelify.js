var test = require('tape');
var Leveler = require('../levelify');
var fs = require('fs');

var testData = fs.readFileSync('tests/testData.md','utf8');

test('Testing leveler', function (t){

  var opts = [{"form":"#$x.", "num": "I"},{"form":"$x.", "num": "A"},{"form":"($x)", "num": "1"}];
  var l = Leveler(testData, opts);

  t.deepEqual({out:'#I. This is a test\n\nA. This is also a test.\n\nB. Super cool leveling is neat.\n\n#II. WOOO!\n\n'}, l, 'Testing that leveler works.');
  t.end()
})
