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
  valueField,
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
      edit: 
        <IconButton 
          variant='ghost' 
          size='xs'
          _hover={{
            outlineWidth: '1px',
            outlineColor:'transparent',
            borderColor: 'transparent'
          }}
          _focus={{
            outlineWidth: '1px',
            outlineColor:'transparent',
          }}
          _focusVisible={{
              outlineWidth: '1px',
              outlineColor:'transparent',
          }}
        >
          <LuPencilLine />
        </IconButton>,
      cancel: 
        <IconButton 
          variant='ghost' 
          size='xs' 
          color='white' 
          backgroundColor='red.500'
          _hover={{
            outlineWidth: '1px',
            outlineColor:'transparent',
            borderColor: 'red.500',
            color: 'red.700',
            fontWeight: '700'
          }}
          _focus={{
            outlineWidth: '1px',
            outlineColor:'transparent',
          }}
          _focusVisible={{
              outlineWidth: '1px',
              outlineColor:'transparent',
          }}
          >
            <LuX />
          </IconButton>,
      confirm: 
        <IconButton 
          variant='ghost' 
          size='xs' 
          color='white' 
          backgroundColor='green.500'
          _hover={{
            outlineWidth: '1px',
            outlineColor:'transparent',
            borderColor: 'green.500',
            color: 'green.700',
            fontWeight: '700'
          }}
          _focus={{
            outlineWidth: '1px',
            outlineColor:'transparent',
          }}
          _focusVisible={{
              outlineWidth: '1px',
              outlineColor:'transparent',
          }}
        >
          <LuCheck />
        </IconButton>,
    }

    return buttons[type ?? 'edit']
  }

  function setTrigger(type: TriggerTypes, btn?: Btn | null): React.ReactNode {
    const triggers = {
      edit: <Editable.EditTrigger asChild>{btn ?? setTriggerButton('edit')}</Editable.EditTrigger>,
      cancel: <Editable.CancelTrigger asChild>{btn ?? setTriggerButton('cancel')}</Editable.CancelTrigger>,
      confirm: <Editable.SubmitTrigger asChild>{btn ?? setTriggerButton('confirm')}</Editable.SubmitTrigger>,
    }

    return triggers[type ?? 'edit']
  }

  return (
    <Editable.Root
      defaultValue={labelField}
      value={valueField}
      onValueCommit={handlers?.onConfirm}
      onValueChange={handlers?.onChange}
    >
      <Editable.Preview width='full' />
      {setField(fieldType)}

      <Editable.Control>
        {triggers.edit?.view && setTrigger('edit', triggers.edit.button)}
        {triggers.cancel?.view && setTrigger('cancel', triggers.cancel.button)}
        {triggers.confirm?.view && setTrigger('confirm', triggers.confirm.button)}
      </Editable.Control>
    </Editable.Root>
  )
}
