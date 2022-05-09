const style = {
  fontFamily: 'inherit',
  fontWeight: 500,
  color: '#5E6278',
  fontSize: '1.1rem',
  lineHeight: 1.5,
  border: '1px solid #E4E6EF',
  padding: '3px 8px',
}
export const styleSelectBox = {
  control: (base: any) => ({
    ...base,
    ...style,
  }),
  menu: (base: any) => ({
    ...base,
    ...style,
  }),
}
