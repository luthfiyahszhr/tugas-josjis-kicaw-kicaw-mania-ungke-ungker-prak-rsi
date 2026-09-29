import {
  AuditLogRepository,
  type CreateAuditLogInput,
} from '../repositories/auditLogRepository.ts';

export class AuditLogService {
  constructor(private auditLogRepository: AuditLogRepository = new AuditLogRepository()) {}

  getAllAuditLogs() {
    return this.auditLogRepository.findAll();
  }

  createAuditLog(input: CreateAuditLogInput) {
    return this.auditLogRepository.create(input);
  }
}