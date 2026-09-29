import type { Request, Response } from 'express';
import { FlagService } from '../services/flagService.ts';

export class FlagController {
  constructor(private flagService: FlagService = new FlagService()) {}

  getFlags = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.flagService.getAllFlags();
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  updateFlag = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.flagService.updateFlagStatus(Number(req.params.id), req.body);
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown): Response {
    const notFound = error instanceof Error && error.message === 'FLAG_NOT_FOUND';
    return res.status(notFound ? 404 : 500).json({
      status: notFound ? 'fail' : 'error',
      message: notFound ? 'Data laporan tidak ditemukan' : 'Terjadi kesalahan pada server',
      ...(!notFound && { error: error instanceof Error ? error.message : String(error) }),
    });
  }
}