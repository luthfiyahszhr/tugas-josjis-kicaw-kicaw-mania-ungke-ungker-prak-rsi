import { ReviewRepository, type CreateReviewInput } from '../repositories/reviewRepository.ts';

export class ReviewService {
  constructor(private reviewRepository: ReviewRepository = new ReviewRepository()) {}

  getAllReviews() {
    return this.reviewRepository.findAll();
  }

  createReview(input: CreateReviewInput) {
    return this.reviewRepository.create(input);
  }

  async deleteReview(id: number) {
    const row = await this.reviewRepository.remove(id);
    if (!row) throw new Error('REVIEW_NOT_FOUND');
    return row;
  }
}