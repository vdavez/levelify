var test = require('tape');
var Leveler = require('../levelify');
var fs = require('fs');

var testData = fs.readFileSync('tests/testData.md','utf8');

test('Testing leveler with no level defined', function (t){
  var l = new Leveler(testData);
  t.deepEqual(["$1.0","$1.$1","$1.$1.$1."], l.levels, 'testing for null levels');
  t.end();
})

test('Testing leveler with level defined', function (t){
  var levels = ["$1.0.","$1.$A.","$1.$A.$1"];
  var expectedDepth = [{'depth':1,'text':'This is a test'}, {'depth':0, 'text':'This is just plain text.'}, {'depth':2,'text':'This is also a test.'}, {'depth':3,'text':'Whoa!'}, {'depth':3,'text':'Neat?'},{'depth':0,'text':'This is also plain text.'}, {'depth':2,'text':'Super cool leveling is neat.'}, {'depth':1,'text':'WOOO!'}];
  var expectedResults = "1.0. This is a test\nThis is just plain text.\n1.A. This is also a test.\n1.A.1 Whoa!\n1.A.2 Neat?\nThis is also plain text.\n1.B. Super cool leveling is neat.\n2.0. WOOO!";

  var l = new Leveler(testData, levels);
  t.deepEqual(["$1.0.","$1.$A.","$1.$A.$1"], l.levels, 'testing levels for defined levels is set');
  t.equal('l. This is a test\nThis is just plain text.\nll. This is also a test.\nlll. Whoa!\nlll. Neat?\nThis is also plain text.\nll. Super cool leveling is neat.\nl. WOOO!', l.inputText, 'testing input text is set');
  t.equal(8, l.getLevelsFromText().length, 'Testing that levels are defined');
  t.deepEqual(expectedDepth, l.getLevelsFromText(), 'Testing that levels are expected depths');
  t.deepEqual(expectedResults, l.results, 'Testing expected results');
  t.deepEqual([ '$1', '$A' ], l.parseLevel(1), 'Testing parseLevel');
  t.deepEqual("2.0.", l.applyLevel(0), 'Testing applyLevel');
  t.end();

})
