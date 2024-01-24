import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { getUserMetricsUseCase } from './get-user-metrics';



let checkInsRepository: InMemoryCheckInsRepository;
let sut: getUserMetricsUseCase;


describe('Get user Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new getUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)

  })
})
