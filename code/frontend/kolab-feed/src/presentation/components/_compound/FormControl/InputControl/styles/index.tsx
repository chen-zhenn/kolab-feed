import styled from 'styled-components'

export const Wrap = styled.aside`
    position: relative;
`

export const Field = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
`

export const Input = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`

export const Placeholder = styled.label`
  display: inline-block;
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 10px 20px;
  background-color: rgba(59, 130, 246, 1);
  color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
`

export const Label = styled.span`
  display: block;
  margin-bottom: .5rem;
  color: rgba(33, 53, 71, 1);
`