import { handleActions, Action } from 'redux-actions'

import actionCreator, { actionTypes, ModalEnum } from './actions'


export const handleShow = (state: ModalState, action: Action<{modal: ModalEnum, id?: number}>) => ({
    ...state,
    show: true,
    type: !!action.payload && action.payload.modal,
    id: !!action.payload && action.payload.id,
})

export const handleHide = (state: ModalState, action: Action<{}>) => ({
    ...state,
    show: false,
    type: undefined,
    id: undefined,
})

export interface ModalState {
    show: boolean
    type?: ModalEnum
    id?: number
}

export const initialState = {
    show: false,
} as ModalState

export default handleActions(
    {
        [actionTypes.SHOW]: handleShow,
        [actionTypes.HIDE]: handleHide,
    } as any,
    {
        ...initialState,
    }
)
