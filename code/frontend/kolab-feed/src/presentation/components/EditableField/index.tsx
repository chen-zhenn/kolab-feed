import React from 'react'
import { 
    LuCheck, 
    LuPencilLine, 
    LuX 
} from 'react-icons/lu'

import { 
    Editable, 
    IconButton, 
} from '@chakra-ui/react'

import { 
    IEditableField, 
    FieldTypes, 
    TriggerTypes, 
    Btn, 
} from './types'

export function EditableField({
  labelField,
  fieldType,
  triggers,
  handlers,
}: IEditableField) {
  function setField(type: FieldTypes): React.ReactElement {
    const fields = {
      input: <Editable.Input />,
      text: <Editable.Textarea />,
    }

    return fields[type ?? 'input']
  }

  function setTriggerButton(type: TriggerTypes): React.ReactElement {
    const buttons = {
      edit: <IconButton variant='ghost' size='xs'><LuPencilLine /></IconButton>,
      cancel: <IconButton variant='ghost' size='xs' color='white' backgroundColor='red.400'><LuX /></IconButton>,
      submit: <IconButton variant='ghost' size='xs' color='white' backgroundColor='green.400'><LuCheck /></IconButton>,
    }

    return buttons[type ?? 'edit']
  }

  function setTrigger(type: TriggerTypes, btn?: Btn | null): React.ReactNode {
    const triggers = {
      edit: <Editable.EditTrigger asChild>{btn ?? setTriggerButton('edit')}</Editable.EditTrigger>,
      cancel: <Editable.CancelTrigger asChild>{btn ?? setTriggerButton('cancel')}</Editable.CancelTrigger>,
      submit: <Editable.SubmitTrigger asChild>{btn ?? setTriggerButton('submit')}</Editable.SubmitTrigger>,
    }

    return triggers[type ?? 'edit']
  }

  return (
    <Editable.Root
      defaultValue={labelField}
      onValueCommit={handlers?.onSubmit}
      onValueChange={handlers?.onChange}
    >
      <Editable.Preview width='full' />
      {setField(fieldType)}

      <Editable.Control>
        {triggers.edit?.view && setTrigger('edit', triggers.edit.button)}
        {triggers.cancel?.view && setTrigger('cancel', triggers.cancel.button)}
        {triggers.submit?.view && setTrigger('submit', triggers.submit.button)}
      </Editable.Control>
    </Editable.Root>
  )
}
