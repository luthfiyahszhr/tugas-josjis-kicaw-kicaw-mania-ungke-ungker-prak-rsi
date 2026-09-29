import { MenuItemRepository, type MenuItemInput } from '../repositories/menuItemRepository.ts';

export class MenuItemService {
  constructor(private menuItemRepository: MenuItemRepository = new MenuItemRepository()) {}

  getAllMenuItems() {
    return this.menuItemRepository.findAll();
  }

  async getMenuItemById(id: number) {
    const row = await this.menuItemRepository.findById(id);
    if (!row) throw new Error('MENU_ITEM_NOT_FOUND');
    return row;
  }

  createMenuItem(input: MenuItemInput) {
    return this.menuItemRepository.create(input);
  }

  async updateMenuItem(id: number, input: Partial<MenuItemInput>) {
    const row = await this.menuItemRepository.update(id, input);
    if (!row) throw new Error('MENU_ITEM_NOT_FOUND');
    return row;
  }

  async deleteMenuItem(id: number) {
    const row = await this.menuItemRepository.remove(id);
    if (!row) throw new Error('MENU_ITEM_NOT_FOUND');
    return row;
  }
}