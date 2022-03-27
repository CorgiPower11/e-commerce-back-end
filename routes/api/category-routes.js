const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  C.findAll ({
    include: [
      {
        model: Category,
        attibutes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne ({
    where: {
      id: req.params.id
    },

    include: [
      {
        model: Product,
        attibutes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
  .then(dbCategorydData => {
    if (!dbCategoryData) {
      res.status(404).json({message: 'No category found with the id provided.'});
      return;
    }
    res.json(dbCategoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  if (!dbCategoryData[0]) {
    res.statusMessage(404).json({message: 'No category was found with id provide'});
    return;
  }
  res.json(dbCategoryData);
})
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destory({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
    res.status(404).json({message: 'No category was found with id provided'});
    return;
  }
  res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
