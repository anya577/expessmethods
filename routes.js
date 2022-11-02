const router = require('express').Router();
const store = require('./store');

// fetch data
router.get('/', (req, res) => {
  const { query } = req;
  const { priceFrom, priceTo } = query;


  // ვამოწმებთ: თუ query ობიექტი არის ცარიელი, მაშინ პირდაპირ დავუბრუნებთ პასუხს
  if (Object.keys(query).length === 0) {
    return res.json(store);
  }

  // ნიშნავს, რომ query ობიექტი არ იყო ცარიელი, ამიტომ გავფილტრავთ მონაცემს გადმოცემული priceFrom და priceTo პარამეტრებით
  const result = store.filter((e) => (e.price >= Number(priceFrom) && e.price <= Number(priceTo)));
  return res.json(result);

});

// add data
router.post('/', (req, res) => {
  const { name } = req.body;

  // ამოწმებს არსებობს თუ არა store-ში მონაცემი
  const item = store.find((e) => e.name === name);

  // ნიშნავს, რომ იპოვა ამ სახელით რაიმე
  if (item) {
    return res.json({
      message: 'item can not be added',
    })
  }

  store.push({
    ...req.body,
    isDeleted: false,
  });

  console.log(store);

  return res.json({
    message: 'already exists',
  })


})

// put
router.put('/:name', (req, res) => {
  const { name } = req.params;
  const { price } = req.body;

  const item = store.find((e) => e.name === name);

  if (item) {
    item.price = Number(price);

    console.log(store)

    return res.json({
      message: 'updated successfully',
    })
  }


  return res.json({
    message: 'product could not found'
  })

});

// delete
router.delete('/:name', (req, res) => {
  const { name } = req.params;

  const item = store.find((e) => e.name === name);

  if (item) {
    item.isDeleted = true;

    console.log(store)

    return res.json({
      message: 'deleted successfully',
    })
  }


  return res.json({
    message: 'product could not found'
  })

});

module.exports = router;