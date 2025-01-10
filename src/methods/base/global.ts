import classNames from 'classnames';
import queryString from 'query-string';

export const isT =
    //@ts-ignore
    ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

export function isSm(): boolean {
    return window.innerWidth < 768;
}

export function cn(...args: (string | undefined | boolean)[]) {
    return classNames(...args);
}

export function jcompare(elm1: any, elm2: any) {
    return JSON.stringify(elm1) === JSON.stringify(elm2);
}

export function createQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString());
        }
    });

    return `?${searchParams.toString()}`;
}

export function getUniqueString(array: string[]) {
    let fin;
    do {
        fin = `${Math.random()}`;
    } while (array.includes(fin));
    return fin;
}
