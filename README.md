# js-records

Records inspired by [SRFI 9](http://srfi.schemers.org/srfi-9/): *Defining Record
Types*.

`struct.js` is implemented with js objects and `tuple.js` with arrays.

`record.js` is an ongoing exercise in minimalism. The idea is to maintain
encapsulation by separating the internal and external representations of the
data. By exposing the representation through one method that takes a callback
function the scope is delimited, decoupling the implementation of public methods
from the data definition.

To tests `npm test`
