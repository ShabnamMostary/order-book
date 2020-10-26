function reconcileOrder(existingBook, incomingOrder) {
  var updatedOrder = []
  var n = existingBook.length
  // when existing book is empty updated book will be the incoming order
  if (n === 0) {
    updatedOrder = [incomingOrder]
  } else {
    var matchingOrder = []
    for (var i = 0; i < n; i++) {
      //If existing book has same type as incoming order then that existing order will be added to the updated book
      if (existingBook[i].type == incomingOrder.type) {
        updatedOrder.push(existingBook[i])
      } else {
        // if the type is different then they are added to the matchingOrder array
        matchingOrder.push(existingBook[i])
      }
    }

    let matchingOrderQuantity = 0
    // matchingOrder type will be opposite of incomingOrder type
    let matchingOrderType = (incomingOrder.type === 'buy') ? 'sell' : 'buy'
    for (var j = 0; j < matchingOrder.length; j++) {
      // any of these conditions are proifitable so order will be fulfilled 
      if (matchingOrder[j].price == incomingOrder.price ||
        matchingOrder[j].price > incomingOrder.price && incomingOrder.type === 'sell' ||
        matchingOrder[j].price < incomingOrder.price && incomingOrder.type === 'buy') {

        matchingOrderQuantity += matchingOrder[j].quantity
      }
    }
    // mismatched order(price) which does not benifit any party,order will not be fulfilled.
    if (matchingOrderQuantity == 0) {
      updatedOrder = []
      updatedOrder.push(existingBook)
      updatedOrder.push(incomingOrder)
      updatedOrder = updatedOrder.flat()
      return updatedOrder

    }
    // diff computes the remaining after fulfilling the incomingOrder
    let diff = Math.abs(matchingOrderQuantity - incomingOrder.quantity)
    let newtype = (matchingOrderQuantity >= incomingOrder.quantity) ? matchingOrderType : incomingOrder.type
    if (matchingOrderQuantity >= incomingOrder.quantity || matchingOrderQuantity < incomingOrder.quantity) {
      if (diff != 0) {
        let adjustment = { type: newtype, quantity: diff, price: incomingOrder.price }
        updatedOrder.push(adjustment)

      }
    }
  }

  return updatedOrder
}
module.exports = reconcileOrder