# Levelify

## Installation

`npm install levelify`

## Usage

Say you have text and you want to have outline numbering, like:

``` md

I. Heading 1
II. Heading 2
Blah blah text here
A. Subheading A
Moar text
B. Subheading b
You get the idea, right?
Cool.

```

With levelify, you can write the text with levels represented by lower-case Ls (`l`). So, for example:
``` md

l. Heading 1
l. Heading 2
Blah blah text here
ll. Subheading A
Moar text
ll. Subheading b
You get the idea, right?
Cool.

```

Then to convert this, you simply would take the string, provide this configuration ["$I","$A"], and the magic of levelify will handle it.

``` js

var textHere = "l. Heading 1\nl. Heading 2\nBlah blah text here\nll. Subheading A\nMoar text\nll. Subheading b\nYou get the idea, right?\nCool."
console.log(new Levelify(textHere, ["$I.","$A."]).results)

```

## License

CC0
