const service = require("./reviews.service.js")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js")

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const matchingReview = await service.read(reviewId);
    if (matchingReview) {
      res.locals.review = matchingReview;
      return next();
    }
    return next({ status: 404, message: "Review cannot be found." });
}

async function destroy(req, res) {
    await service.destroy(res.locals.review.review_id)
    res.sendStatus(204)
}

async function update(req, res) {
    const updatedReview = { ...res.locals.review, ...req.body.data };
    await service.update(updatedReview);
    const reviewToReturn = await service.getReviewWithCritic(
      res.locals.review.review_id
    );
    res.json({ data: reviewToReturn });
  }

module.exports = {
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy)
    ],

    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update)
    ],
}