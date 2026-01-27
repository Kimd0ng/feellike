import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getRecommendation } from '@feellike/api';
import { generateDeepLink } from '../../utils/helpers';
import { checkUsageAvailability, incrementUsage } from '../usage/usageApi';
import { usageKeys } from '../usage/useUsageQuery';
import type { TRecommendationRequest, TRecommendationResult } from './types';

/**
 * 사용량 제한 초과 에러
 * @author Feel Economy Team
 */
export class UsageLimitExceededError extends Error {
    constructor() {
        super('오늘의 무료 추천 횟수를 모두 사용하셨습니다.');
        this.name = 'UsageLimitExceededError';
    }
}

/**
 * 추천 요청 뮤테이션 훅
 * React Query를 사용하여 중복 요청 방지 및 상태 관리
 * 사용량 검증 및 증가 로직 포함
 * @author Feel Economy Team
 */
export const useRecommendationMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['recommendation'],
        mutationFn: async (request: TRecommendationRequest): Promise<TRecommendationResult | null> => {
            console.log('[MUTATION] Starting mutation...');

            // 사용량 체크
            console.log('[MUTATION] Checking usage availability...');
            const canUse = await checkUsageAvailability();
            
            if (!canUse) {
                console.log('[MUTATION] Usage limit exceeded');
                throw new UsageLimitExceededError();
            }

            const result = await getRecommendation(request);
            console.log('[MUTATION] getRecommendation returned:', result);

            if (!result) {
                console.log('[MUTATION] Result is null, throwing error');
                throw new Error('추천 결과를 받아오지 못했습니다.');
            }

            // 사용량 증가 (추천 성공 후)
            console.log('[MUTATION] Incrementing usage...');
            await incrementUsage();

            // 딥링크 생성
            console.log('[MUTATION] Generating deep link for:', result.platform, result.searchKeyword);
            const deepLink = generateDeepLink(result.platform, result.searchKeyword);
            console.log('[MUTATION] Deep link generated:', deepLink);

            const finalResult = {
                ...result,
                deepLink,
            };
            console.log('[MUTATION] Returning final result:', finalResult);
            return finalResult;
        },
        onSuccess: () => {
            // 사용량 쿼리 캐시 무효화
            queryClient.invalidateQueries({ queryKey: usageKeys.all });
        },
    });
};
