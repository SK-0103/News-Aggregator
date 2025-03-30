const express = require('express');
const router = express.Router();
const {
  getSources,
  getSourceById,
  createSource,
  updateSource,
  deleteSource,
  getSourcesByBias,
} = require('../controllers/sourceController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getSources)
  .post(protect, authorize('admin'), createSource);

router.route('/bias/:bias').get(getSourcesByBias);

router.route('/:id')
  .get(getSourceById)
  .put(protect, authorize('admin'), updateSource)
  .delete(protect, authorize('admin'), deleteSource);

module.exports = router;
