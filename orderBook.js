function reconcileOrder(existingBook, incomingOrder) {
  var updatedOrder = []
  var n = existingBook.length
  if (n === 0) {
    updatedOrder = [incomingOrder]
  } else {
    var matchingOrder = []
    for (var i = 0; i < n; i++) {
      if (existingBook[i].type == incomingOrder.type) {
        updatedOrder.push(existingBook[i])
      } else {

        matchingOrder.push(existingBook[i])
      }
    }

    matchingOrder.quantity = 0

    for (var j = 0; j < matchingOrder.length; j++) {
      if (matchingOrder[j].price == incomingOrder.price) {
        matchingOrder.quantity += matchingOrder[j].quantity
      } else if (matchingOrder[j].price > incomingOrder.price && incomingOrder.type === 'sell') {
        matchingOrder.quantity += matchingOrder[j].quantity
      } else if (matchingOrder[j].price < incomingOrder.price && incomingOrder.type === 'buy') {
        matchingOrder.quantity += matchingOrder[j].quantity
      }
    }
    if (matchingOrder.quantity == 0) {
      updatedOrder.pop()
      updatedOrder.push(existingBook)
      updatedOrder.push(incomingOrder)
      updatedOrder = updatedOrder.flat()
      return updatedOrder

    }
    if (matchingOrder.quantity >= incomingOrder.quantity) {
      let diff = matchingOrder.quantity - incomingOrder.quantity
      let newtype
      if (incomingOrder.type === 'sell') {
        newtype = 'buy'
      } else {
        newtype = 'sell'
      }
      if (diff != 0) {
        let adjustment = {
          type: newtype, quantity: diff, price: incomingOrder.price
        }
        updatedOrder.push(adjustment)
      }
    } else if (matchingOrder.quantity < incomingOrder.quantity) {
      let diff = incomingOrder.quantity - matchingOrder.quantity
      if (diff != 0) {
        let adjustment = {
          type: incomingOrder.type, quantity: diff, price: incomingOrder.price
        }
        updatedOrder.push(adjustment)
      }
    }
  }

  return updatedOrder

}
module.exports = reconcileOrder