export default function validEmail() {
  return (control) => {
    const value = control.value;
    if( !value ){ return null; }

    return !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? {invalidChar: true} : null;
  };
}