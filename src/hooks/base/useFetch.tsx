import useCtx from 'components/base/Context';
import { get, post } from 'methods/base/fetch';
import { getUniqueString } from 'methods/base/global';


export function useGet() {

    const { loadingList, setLoadingList } = useCtx();

    return (endpoint: string, baseUrl = '') => {

        // add job to the job list in the global context
        const jobId = getUniqueString(loadingList);
        setLoadingList((old: string[]) => [...old, jobId]);

        return new Promise((resolve, reject) => {
            get(endpoint, baseUrl)
                .then(res => resolve(res))
                .catch(err => reject(err))
                .finally(() => {
                    // remove the job because its don executing
                    setLoadingList((old: any) =>
                        old.filter((e: string) => e !== jobId)
                    )
                })
        });

    }
};

export function usePost() {

    const { loadingList, setLoadingList } = useCtx();

    return (endpoint: string, data: any, baseUrl?: string) => {

        const jobId = getUniqueString(loadingList);
        setLoadingList((old: string[]) => [...old, jobId]);

        return new Promise((resolve, reject) => {
            post(endpoint, data, baseUrl)
                .then(res => resolve(res))
                .catch(err => reject(err))
                .finally(() => {
                    setLoadingList((old: any) =>
                        old.filter((e: string) => e !== jobId)
                    )
                })
        });

    }
};