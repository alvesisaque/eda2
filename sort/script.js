let ARRAY_SIZE = 15
let POSITION = 0
let i = 0
let key
let sorted = false
let list = new Array()
let bucket = new Array()

initializeList()
initializeBuckets()

// Reinicia criando uma lova lista e limpando os baldes
function reset() {
  sorted = false
  initializeList()
  clearBuckets()
  i = 0
  POSITION = 0
  initializeList()
  draw()
}

// cria a lista de valores
function initializeList() {
  for (let i = 0; i < ARRAY_SIZE; i++) {
    list[i] = Math.floor(Math.random() * 1000)
  }
}

let dataWebsiteViewsChart = {
  labels: list,
  series: [list]
}

// inicia os baldes
function initializeBuckets() {
  for (let i = 0; i < 10; i++) {
    bucket[i] = new Array()
  }
}

// limpa os baldes
function clearBuckets() {
  for (let i = 0; i < 10; i++) {
    bucket[i].splice(0, bucket[i].length)
  }
}

// 
function draw() {
 
  drawBuckets(bucket)

  if (sorted) {
    md.showNotification('top', 'center', 'end')
  }

  md.initDashboardPageCharts()
}


function drawBuckets(bucket) {
  let paras = document.getElementsByClassName('numbers')
  console.log(paras[0])
  while (paras[0] !== undefined) {
    paras[0].remove()
  }

  for (let i = 0; i < 10; i++) {

    let bucket_name = 'balde_' + i
    let bucket_node = document.getElementById(bucket_name)

    for (let j = 0; j < bucket[i].length; j++) {

      let h2_node = document.createElement('H2')
      h2_node.classList.add('card-title')
      h2_node.classList.add('numbers')
      // adicionar o valor ao elemento
      let textnode = document.createTextNode(bucket[i][j])
      // adicionar o elemento ao h2
      h2_node.appendChild(textnode)
      // adicionar o valor ao balde
      bucket_node.appendChild(h2_node)
    }

    if (i == key && bucket[i].length > 0) {
      let bucket_name = 'balde_' + i
      let bucket_node = document.getElementById(bucket_name).lastChild
      bucket_node.classList.add('text-light')
    } 
  }
}

let count = 0
function step() {
  if (takeAStep()) {
    sorted = true
  }
  draw()
  count++
}

function takeAStep() {
  // Distribute the elements from list to buckets
  
  if (i < list.length) {
    key = getKey(list[i], POSITION)
    bucket[key][bucket[key].length] = list[i]
    i++
    return false
  } else if (POSITION < 2) {
    bucketsToList()
    clearBuckets()
    clearHtmlBuckets()
    i = 0
    POSITION++
    md.showNotification('top', 'center', 'update')
    return false
  } else {
    bucketsToList()
    clearBuckets()

    return true
  }
  
}

function clearHtmlBuckets() {}

/** move the elements from the buckets back to list */
function bucketsToList() {
  let k = 0 // k is an index for list
  for (let i = 0; i < bucket.length; i++) {
    for (let j = 0; j < bucket[i].length; j++) list[k++] = bucket[i][j]
  }
}

/** Return the digit at the specified POSITION.
 * The last digit's POSITION is 0. */
function getKey(number, POSITION) {
  let result = 1
  for (let i = 0; i < POSITION; i++) 
    result *= 10
    
  return Math.floor(number / result) % 10
  
}

