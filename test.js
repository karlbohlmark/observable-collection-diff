var assert = require('assert')
var ObservableDiff = require('./')

var ObservableCollection = require('observable-collection')

var coll1 = new ObservableCollection([1, 2, 3])
var coll2 = new ObservableCollection([1])

var diff = new ObservableDiff(coll1, coll2)

coll1.push(2)
coll1.push(4)
coll2.remove(1)

assert.deepEqual(diff.models.sort(), [1,2,3,4].sort())


var arr1 = [1, 2]
var c2 = new ObservableCollection([1])
var diff2 = new ObservableDiff(arr1, c2)
assert.deepEqual(diff2.models, [2])