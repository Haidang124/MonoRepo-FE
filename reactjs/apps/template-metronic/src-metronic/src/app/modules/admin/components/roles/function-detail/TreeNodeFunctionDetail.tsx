import lodash from 'lodash'
import React, {useEffect, useState} from 'react'
import {FunctionDetailModel} from '../../../models/FunctionDetailModel'
import {useFunctionDetailContext} from './FunctionDetailContext'

interface Props {
  functionNode: FunctionDetailModel
}

const TreeNodeFunctionDetail: React.FC<Props> = ({functionNode}) => {
  const [isOpen] = useState(true)
  const {functions, functionIds, onChangeFunctionIds} = useFunctionDetailContext()

  const [isChecked, setIsChecked] = useState(functionIds.some((x) => x === functionNode.id))
  // const functionIds = listFunctionOfRole.map((x: FunctionRoleData) => x.functionId)

  useEffect(() => {
    setIsChecked(functionIds?.includes(functionNode.id) ?? false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [functionIds])

  const getParent = (id?: string): FunctionDetailModel => {
    const p = functions.find((item) => item.id === id)

    return {
      ...p,
      children: functions.filter((item) => item.parentId === id),
    } as FunctionDetailModel
  }

  const changeFunctionIdsBelow = (
    functionNode: FunctionDetailModel,
    checked: boolean
  ): string[] => {
    if (functionNode.children.length === 0) return [functionNode.id]

    return [
      functionNode.id,
      ...functionNode.children.map((item) => changeFunctionIdsBelow(item, checked)).flat(),
    ]
  }
  const changeFunctionIdsAbove = (
    functionNode: FunctionDetailModel,
    checked: boolean
  ): string[] => {
    if (functionNode.id == null) return []

    if (functionNode.parentId === null) return [functionNode.id]

    const parentNode = getParent(functionNode.parentId)

    if (
      parentNode.children.length === 1 ||
      parentNode.children
        .filter((e) => e.id !== functionNode.id)
        .every((item) => functionIds.includes(item.id))
    ) {
      return [functionNode.id, ...changeFunctionIdsAbove(parentNode, checked)]
    }

    return [functionNode.id]
  }

  const handleCheck = (e: any) => {
    let newFunctionIds = [
      ...changeFunctionIdsBelow(functionNode, e.target.checked),
      ...changeFunctionIdsAbove(functionNode, e.target.checked),
    ]

    newFunctionIds = e.target.checked
      ? lodash.uniq([...functionIds, ...newFunctionIds])
      : lodash.uniq(functionIds.filter((item) => !newFunctionIds.includes(item)))

    setIsChecked(e.target.checked)

    if (onChangeFunctionIds) onChangeFunctionIds(newFunctionIds)
  }

  const handleClickFunction = () => {
    // if (functionNode.children && functionNode.children.length > 0) {
    //   setIsOpen(!isOpen)
    // }
  }

  return (
    <div className='tree'>
      {isOpen && functionNode.children?.length > 0 && <div className='tree-line' />}
      <div className='tree-title'>
        <div className='form-check form-check-custom form-check-solid form-check-sm'>
          <input
            className='form-check-input'
            type='checkbox'
            id='flexCheckDefault'
            onChange={handleCheck}
            checked={isChecked}
          />
        </div>
        <div className='ms-3 no-select flex-grow-1' onClick={handleClickFunction}>
          {functionNode.name}
        </div>
      </div>
      {isOpen && functionNode.children && functionNode.children.length !== 0 && (
        <div className='tree-body'>
          {functionNode.children?.map((n, i) => (
            <div key={i}>
              <TreeNodeFunctionDetail functionNode={n} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default TreeNodeFunctionDetail
