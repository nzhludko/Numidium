import axios from 'axios'
import * as code from 'http-status-codes'

import encodeQuery, { Parameter } from 'util/encodeQuery'
import Collection from 'model/Collection'

import { momentalizeEntity } from './utils'


export const API_URL = `${window.location.origin}/api`

const getList = (entity: string, params?: Parameter[]) =>
    axios.get(!!params
        ? `${API_URL}/${entity}${encodeQuery(params)}`
        : `${API_URL}/${entity}`
    )

const get = (entity: string, id: number) =>
    axios.get(`${API_URL}/${entity}/${id}`)

const post = (entity: string, data: any) =>
    axios.post(`${API_URL}/${entity}`, data)

const put = (entity: string, id: number, data: any) =>
    axios.put(`${API_URL}/${entity}/${id}`, data)

const del = (entity: string, id: number) =>
    axios.delete(`${API_URL}/${entity}/${id}`)


const createGetList = <T>(enity: string): (params?: Parameter[]) => Promise<Collection<T>> =>
    (params?: Parameter[]) =>
        getList(enity, params)
            .then(response => ({
                '@id': response.data['@id'],
                '@type': response.data['@type'],
                '@context': response.data['@context'],
                member: response.data['hydra:member'].map(momentalizeEntity),
                totalItems: parseInt(response.data['hydra:totalItems'], 10),
            }))

const createGet = <T>(entity: string): (id: number) => Promise<T> => (id: number) =>
    get(entity, id)
        .then(response => momentalizeEntity(response.data) as T)

// const createPost = <T>(entity: string): (object: T) => Promise<RestResponse<T>> => (object: T) =>
//     post(entity, object)
//         .then(
//             response => ({
//                 code: response.status,
//                 error: response.status !== code.CREATED ? response.data : null,
//                 data: response.status === code.CREATED ? response.data : null,
//             }),
//             error => axiosErrorToResponseError(error)
//         )

// const createPut = <T>(entity: string): (id: number, object: T) => Promise<RestResponse<T>> => (id: number, object: T) =>
//     put(entity, id, object)
//         .then(
//             response => ({
//                 code: response.status,
//                 error: response.status !== code.OK ? response.data : null,
//                 data: response.status === code.OK ? response.data : null,
//             }),
//             error => axiosErrorToResponseError(error)
//         )

// const createDelete = <T>(entity: string): (id: number) => Promise<RestResponse<T>> => (id: number) =>
//     del(entity, id)
//         .then(
//             response => ({
//                 code: response.status,
//                 error: response.status !== code.NO_CONTENT ? response.data : null,
//                 data: response.status === code.NO_CONTENT ? response.data : null,
//             }),
//             error => axiosErrorToResponseError(error)
//         )

// const createGetFiltered = <T>(entity: string): (f: Filter[]) => Promise<RestResponse<T[]>> => (f: Filter[]) =>
//         getFiltered(entity, f)
//             .then(
//                 response => ({
//                     code: response.status,
//                     error: response.status !== code.OK ? response.data : null,
//                     data: response.status === code.OK ? response.data['hydra:member'] : null,
//                 }),
//                 error => axiosErrorToResponseError(error)
//             )

// const createGetPaginated = <T>(entity: string): (page: number) => Promise<RestResponse<T[]>> => (page: number) =>
//         createGetFiltered<T>(entity)([{ field: 'page', value: page.toString() } as Filter])

export default <T>(entity: string) => ({
    getList: createGetList<T>(entity),
    get: createGet<T>(entity),

    // post: createPost<T>(entity),
    // put: createPut<T>(entity),
    // delete: createDelete<T>(entity),

    // getFiltered: createGetFiltered<T>(entity),
    // getPaginated: createGetPaginated<T>(entity),
})
