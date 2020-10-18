function reconcileOrder(existingBook, incomingOrder) {
  var updatedOrder = []
  var n = existingBook.length
  if (n === 0) {
    updatedOrder = [incomingOrder]
  } else if (n == 1) {
    if (existingBook[0].type == incomingOrder.type || existingBook[0].price != incomingOrder.price) {
      updatedOrder.push(existingBook[0], incomingOrder)
    }
  } else if (n > 1) {
    var matchingOrder = []
    for (var i = 0; i < n; i++) {
      if (existingBook[i].type == incomingOrder.type) {
        updatedOrder.push(existingBook[i])
      } else {

        matchingOrder.push(existingBook[i])
      }
    }
    if (matchingOrder.length == 1) {
      if (matchingOrder[0].quantity > incomingOrder.quantity && matchingOrder[0].price == incomingOrder.price) {
        var diff = matchingOrder[0].quantity - incomingOrder.quantity
        var adjustment = { type: matchingOrder[0].type, quantity: diff, price: matchingOrder[0].price }
        updatedOrder.push(adjustment)
      } else if (matchingOrder[0].quantity < incomingOrder.quantity && matchingOrder[0].price == incomingOrder.price) {
        diff = incomingOrder.quantity - matchingOrder[0].quantity
        adjustment = { type: incomingOrder.type, quantity: diff, price: incomingOrder.price }
        updatedOrder.push(adjustment)
      } else if (matchingOrder[0].price < incomingOrder.price) {
        updatedOrder.pop()
        updatedOrder.push(existingBook)
        updatedOrder.push(incomingOrder)
        updatedOrder = updatedOrder.flat()


      }
    } else {
      matchingOrder.quantity = matchingOrder[0].quantity

      for (var j = 1; j < matchingOrder.length; j++) {
        if (matchingOrder[j].price == matchingOrder[j - 1].price) {
          matchingOrder.quantity += matchingOrder[j].quantity
        }
      }
      if (matchingOrder.quantity >= incomingOrder.quantity && matchingOrder[0].price == incomingOrder.price) {
        diff = matchingOrder.quantity - incomingOrder.quantity
        if (diff != 0) {
          adjustment = {
            type: matchingOrder[0].type, quantity: diff, price: matchingOrder[0].price
          }
          updatedOrder.push(adjustment)
        }
      } else if (matchingOrder.quantity < incomingOrder.quantity && matchingOrder[0].price == incomingOrder.price
      ) {
        diff = incomingOrder.quantity - matchingOrder.quantity
        if (diff != 0) {
          adjustment = {
            type: incomingOrder.type, quantity: diff, price: incomingOrder.price
          }
          updatedOrder.push(adjustment)
        }
      }
      else if (matchingOrder.price < incomingOrder.price) {
        updatedOrder.pop()
        updatedOrder.push(existingBook)
        updatedOrder.push(incomingOrder)
        updatedOrder = updatedOrder.flat()


      }

    }

  }
  return updatedOrder

}
module.exports = reconcileOrder