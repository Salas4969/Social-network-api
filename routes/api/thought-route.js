const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
  } = require('../../controllers/thoughts-controller');

  router
  .route('/')
  .get(getAllThoughts)
  .post(createThought)

  router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  router
  .route('/:thoughtId/reactions/:reactionId')
  .post(addReaction)
  .delete(deleteReaction)

  module.exports = router