function reconcileOrder(existingBook, incomingOrder) {
  var updatedOrder = []
  var n = existingBook.length
  if (n === 0) {
    updatedOrder = [incomingOrder]
  } else if (n == 1 && existingBook[0].type == incomingOrder.type || existingBook[0].price != incomingOrder.price) {
    updatedOrder.push(existingBook[0], incomingOrder)
  } else if (n > 1) {
    for (var i = 0; i < n; i++) {
      if (existingBook[i].type == incomingOrder.type) {
        updatedOrder.push(existingBook[i])
      } else if (existingBook[i].quantity > incomingOrder.quantity && existingBook[i].price == incomingOrder.price) {
        var diff = existingBook[i].quantity - incomingOrder.quantity
        var adjustment = { type: existingBook[i].type, quantity: diff, price: existingBook[i].price }
        updatedOrder.push(adjustment)
      }
    }

  }
  updatedOrder.push(updatedOrder.splice(updatedOrder.indexOf(adjustment), 1)[0])
  return updatedOrder

}



module.exports = reconcileOrder