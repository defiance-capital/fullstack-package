import {
  HandleLeaveRequestAction as Action,
  HandleLeaveRequestCommand as Command,
} from '@/application/dto/handle-leave-request.command';
import { ResourceNotFoundException } from '@/application/exception/resource-not-found.exception';
import { HandleLeaveRequestUseCase } from '@/application/usecase/handle-leave-request.usecase';
import { LeaveRequestStatus } from '@/domain/entity/leave-request.entity';
import { ILeaveRequestRepository } from '@/domain/repository/leave-request.repository.interface';
import { mock, mockReset } from 'jest-mock-extended';

describe('HandleLeaveRequestUseCase', () => {
  const mockRepo = mock<ILeaveRequestRepository>();
  let usecase: HandleLeaveRequestUseCase;

  beforeEach(() => {
    mockReset(mockRepo);
    usecase = new HandleLeaveRequestUseCase(mockRepo);
  });

  it('should return true if approve success', async () => {
    const command: Command = { id: 1, action: Action.APPROVE, managerId: 1 };
    mockRepo.updateStatus
      .calledWith(command.id, LeaveRequestStatus.APPROVED, command.managerId)
      .mockResolvedValue(true);

    const result = await usecase.execute(command);

    expect(result).toBe(true);
  });

  it('should throw exception if request not found', async () => {
    const command: Command = { id: 1, action: Action.REJECT, managerId: 1 };
    mockRepo.updateStatus
      .calledWith(command.id, LeaveRequestStatus.REJECTED, command.managerId)
      .mockResolvedValue(false);

    await expect(usecase.execute(command)).rejects.toThrow(ResourceNotFoundException);
  });
});
