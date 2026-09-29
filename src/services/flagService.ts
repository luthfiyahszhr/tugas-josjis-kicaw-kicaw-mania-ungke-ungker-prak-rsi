import { FlagRepository, type UpdateFlagInput } from '../repositories/flagRepository.ts';

export class FlagService {
  constructor(private flagRepository: FlagRepository = new FlagRepository()) {}

  getAllFlags() {
    return this.flagRepository.findAll();
  }

  async updateFlagStatus(id: number, input: UpdateFlagInput) {
    const row = await this.flagRepository.updateStatus(id, input);
    if (!row) throw new Error('FLAG_NOT_FOUND');
    return row;
  }
}