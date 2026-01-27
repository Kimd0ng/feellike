/**
 * classNames 유틸리티
 * 여러 클래스를 조합할 때 사용
 * @author Feel Economy Team
 */
export const classNames = (
    ...classes: (string | undefined | null | false)[]
): string => {
    return classes.filter(Boolean).join(' ');
};
