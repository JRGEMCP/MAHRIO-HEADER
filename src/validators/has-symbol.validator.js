export default function hasSymbol() {
  return (control) => {
    const value = control.value;
    if( !value ){ return null; }

    return !value.match(/[$-/:-?{-~!"^_`\[\]]/) ? {invalidChar: true} : null;
  };
}