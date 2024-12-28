import styled from 'styled-components'

export const Wrap = styled.aside`
    position: relative;
`

export const Field = styled.fieldset<{ disabled?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: max-content;
`

export const Input = styled.input<{ disabled?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: ${(props) => props?.disabled ? 'not-allowed' : 'pointer'};
`

export const Placeholder = styled.label<{ disabled?: boolean }>`
  display: inline-block;
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 10px 20px;
  background-color: ${(props) => props?.disabled ? 'var(--chakra-colors-gray-200)' : 'var(--chakra-colors-blue-500)'};
  color: ${(props) => props?.disabled ? 'var(--chakra-colors-gray-400)' : 'var(--chakra-colors-white)'};
  border: none;
  border-radius: 8px;
  text-align: center;
  cursor: ${(props) => props?.disabled ? 'not-allowed' : 'pointer'};
`

export const Label = styled.span`
  display: block;
  margin-bottom: .5rem;
  color: rgba(33, 53, 71, 1);
`