import urlJoin from 'url-join';

function base_fetch(endpoint: string, data?: any, method = 'POST', headers = {}, baseUrl?: string) {
    return new Promise((resolve) => {
        fetch(
            urlJoin(baseUrl || '', endpoint),
            {
                method, headers,
                body: method === 'POST' ? JSON.stringify(data) : undefined
            })
            //@ts-ignore
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error('Error:', error));
    })
}
export function get(endpoint: string, baseUrl = '') {
    return new Promise((resolve) => {
        base_fetch(endpoint, {}, 'GET', {}, baseUrl).then(res => resolve(res))
    })
}
export function post(endpoint: string, data: any, baseUrl?: string) {
    return new Promise((resolve) => {
        base_fetch(
            endpoint, data, 'POST',
            { 'Content-Type': 'application/json' }
            , baseUrl
        )
            .then(res => resolve(res))
    })
}