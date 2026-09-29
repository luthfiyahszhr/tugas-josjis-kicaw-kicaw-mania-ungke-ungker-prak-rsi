import type { Request, Response } from 'express';
import { LikeService } from '../services/likeService.ts';

export class LikeController {
  constructor(private likeService: LikeService = new LikeService()) {}

  createLike = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.likeService.createLike(req.body);
      return res.status(201).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  deleteLike = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.likeService.deleteLike(
        Number(req.params.reviewId),
        Number(req.params.userId),
      );
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown): Response {
    const notFound = error instanceof Error && error.message === 'LIKE_NOT_FOUND';
    return res.status(notFound ? 404 : 500).json({
      status: notFound ? 'fail' : 'error',
      message: notFound ? 'Data like tidak ditemukan' : 'Terjadi kesalahan pada server',
      ...(!notFound && { error: error instanceof Error ? error.message : String(error) }),
    });
  }
}