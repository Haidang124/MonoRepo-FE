import {createSelector} from 'reselect'
import {RootState} from '../../../../setup'

const authSelector = (state: RootState) => state.auth

export const permissionsSelector = createSelector([authSelector], (auth) => auth.permissions)
