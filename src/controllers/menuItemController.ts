import type { Request, Response } from 'express';
import { MenuItemService } from '../services/menuItemService.ts';

export class MenuItemController {
  constructor(private menuItemService: MenuItemService = new MenuItemService()) {}

  getMenuItems = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.menuItemService.getAllMenuItems();
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  getMenuItemById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.menuItemService.getMenuItemById(Number(req.params.id));
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  createMenuItem = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.menuItemService.createMenuItem(req.body);
      return res.status(201).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  updateMenuItem = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.menuItemService.updateMenuItem(Number(req.params.id), req.body);
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  deleteMenuItem = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await this.menuItemService.deleteMenuItem(Number(req.params.id));
      return res.status(200).json({ status: 'success', data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown): Response {
    const notFound = error instanceof Error && error.message === 'MENU_ITEM_NOT_FOUND';
    return res.status(notFound ? 404 : 500).json({
      status: notFound ? 'fail' : 'error',
      message: notFound ? 'Data menu tidak ditemukan' : 'Terjadi kesalahan pada server',
      ...(!notFound && { error: error instanceof Error ? error.message : String(error) }),
    });
  }
}