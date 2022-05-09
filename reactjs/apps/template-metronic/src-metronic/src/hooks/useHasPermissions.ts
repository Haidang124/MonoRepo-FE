import {permissionsSelector} from '../app/modules/auth/redux/AuthSelector'
import {useSelector} from 'react-redux'
import {RootState} from '../setup'

export function useHasPermissions(...permissions: string[]) {
  const userPermissions = useSelector<RootState>((state) => permissionsSelector(state)) as string[]
  let hasPermission = false
  for (let i = 0; i < permissions.length; i++) {
    if (userPermissions?.includes(permissions[i])) {
      hasPermission = true
      break
    }
  }

  return hasPermission
}
