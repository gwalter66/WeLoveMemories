const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties.js")

// get a particular review
function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first();
}

// delete a particular review
function destroy(review_id) {
    return knex("reviews")
        .where({ review_id }).del()
}

// function to map critic info
const mapCriticInfo = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
  });

  // get a particular review with the critic information
  function getReviewWithCritic(reviewId) {
    return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select("*")
      .where({ review_id: reviewId })
      .first()
      .then((result) => {
        const updatedReview = mapCriticInfo(result);
        return updatedReview;
      });
  }

// update a review
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

module.exports = {
    destroy,
    read,
    getReviewWithCritic,
    update,
}