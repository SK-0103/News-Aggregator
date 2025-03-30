const express = require('express');
const router = express.Router();
const {
  getNews,
  getNewsById,
  getNewsBySource,
  getNewsByCategory,
  getNewsByBias,
  searchNews,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getNews)
  .post(protect, authorize('admin'), createNews);

router.route('/search').get(searchNews);
router.route('/source/:sourceId').get(getNewsBySource);
router.route('/category/:category').get(getNewsByCategory);
router.route('/bias/:bias').get(getNewsByBias);

router.route('/:id')
  .get(getNewsById)
  .put(protect, authorize('admin'), updateNews)
  .delete(protect, authorize('admin'), deleteNews);

module.exports = router;
