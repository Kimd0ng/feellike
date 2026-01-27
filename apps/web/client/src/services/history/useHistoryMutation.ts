import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmotionLog, saveEmotionLog, type TEmotionLog } from './index';
import { historyKeys } from './useHistoryQuery';

/**
 * 감정 로그 저장 뮤테이션
 * @author Feel Economy Team
 */
export const useSaveEmotionLogMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (log: Omit<TEmotionLog, 'id' | 'user_id' | 'created_at'>) => saveEmotionLog(log),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: historyKeys.all });
        },
    });
};

/**
 * 감정 로그 삭제 뮤테이션
 * @author Feel Economy Team
 */
export const useDeleteEmotionLogMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteEmotionLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: historyKeys.all });
        },
    });
};
