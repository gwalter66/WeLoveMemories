const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties.js")

function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first();
}

function destroy(review_id) {
    return knex("reviews")
        .where({ review_id }).del()
}

const mapCriticInfo = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
  });

  function getReviewWithCritic(reviewId) {
    return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select("*")
      .where({ review_id: reviewId })
      .first()
      .then((result) => {
        const updatedReview = addCriticDetails(result);
        return updatedReview;
      });
  }

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