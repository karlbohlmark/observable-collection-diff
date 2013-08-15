var ObservableCollection = require('observable-collection')
var diff = require('set-diff')

module.exports = ObservableCollectionDiff

function has (coll, item) {
	if (coll.has) {
		return coll.has(item)
	}

	return coll.indexOf(item) !== -1
}

function ObservableCollectionDiff (a, b) {
	ObservableCollection.call(this)
	var me = this
	var models = this.models = diff(a.models || a, b.models || b)

	if (a.on) {
		a.on('add', function (newItem) {
			if (!has(b, newItem) && !has(me, newItem)) {
				me.push(newItem)
			}
		})

		a.on('remove', function (removedItem) {
			if (has(me, removedItem)) {
				me.remove(removedItem)
			}
		})
	}

	if (b.on) {
		b.on('add', function (newItem) {
			if (has(me, newItem)) {
				me.remove(newItem)
			}
		})

		b.on('remove', function (removedItem) {
			if (has(a, removedItem) && !has(me, removedItem)) {
				me.push(removedItem)
			}
		})
	}
}

function remove (arr, item) {
	arr.splice(arr.indexOf(item), 1)
}


ObservableCollectionDiff.prototype = Object.create(ObservableCollection.prototype)