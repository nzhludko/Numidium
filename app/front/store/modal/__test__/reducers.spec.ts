import { actionTypes, ModalEnum } from '../actions'

import { handleShow, handleHide } from '../reducers'


test('`handleShow` returns correctly state', () => {
    const state = {
        show: false,
        type: undefined,
        id: undefined,
    }

    const newState = handleShow(state, {
        type: actionTypes.SHOW,
        payload: {
            modal: ModalEnum.VACATION,
            id: 1,
        },
    })

    expect(newState).toEqual({
        show: true,
        type: ModalEnum.VACATION,
        id: 1,
    })
})

test('`handleHide` returns correctly state', () => {
    const state = {
        show: true,
        type: ModalEnum.VACATION,
        id: 12,
    }

    const newState = handleHide(state, { type: actionTypes.HIDE })

    expect(newState).toEqual({
        show: false,
    })
})
