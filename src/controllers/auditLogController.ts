import type { Request, Response } from 'express';
import { AuditLogService } from '../services/auditLogService.ts';

export class AuditLogController {
  constructor(private auditLogService: AuditLogService = new AuditLogService()) {}

  getAuditLogs = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.auditLogService.getAllAuditLogs();
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  createAuditLog = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.auditLogService.createAuditLog(req.body);
      return res.status(201).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown): Response {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}