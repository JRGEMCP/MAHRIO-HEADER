export default function validTag() {
  return (control) => {
    const value = control.value;
    if( !value ){ return null; }

    return !value.match(/^[a-z0-9]+$/i) ? {invalidChar: true} : null;
  };
}