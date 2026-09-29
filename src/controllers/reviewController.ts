import type { Request, Response } from 'express';
import { ReviewService } from '../services/reviewService.ts';

export class ReviewController {
  constructor(private reviewService: ReviewService = new ReviewService()) {}

  getReviews = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.reviewService.getAllReviews();
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  createReview = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.reviewService.createReview(req.body);
      return res.status(201).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  deleteReview = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.reviewService.deleteReview(Number(req.params.id));
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown): Response {
    const notFound = error instanceof Error && error.message === 'REVIEW_NOT_FOUND';
    return res.status(notFound ? 404 : 500).json({
      status: notFound ? 'fail' : 'error',
      message: notFound ? 'Data review tidak ditemukan' : 'Terjadi kesalahan pada server',
      ...(!notFound && { error: error instanceof Error ? error.message : String(error) }),
    });
  }
}