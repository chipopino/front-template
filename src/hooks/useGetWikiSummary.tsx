import { useGet } from 'hooks/useFetch';

export function useGetWikiSummary() {
    const get = useGet();
    return (wikipediaLink: string) => {
        return new Promise((resolve, reject) => {
            const prefix = (/https:\/\/(www\.)?(.*?)\.wikipedia.org\/(.+)/gm).exec(wikipediaLink)?.[2];
            const items = wikipediaLink.split('/');
            const articleName = items[items.length - 1];
            get(`api/rest_v1/page/summary/${articleName}`, `https://${prefix}.wikipedia.org`)
                .then((data: any) => {
                    resolve(data.extract)
                })
        })
    }
};


