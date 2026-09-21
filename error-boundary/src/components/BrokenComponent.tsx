function BrokenComponent() {
  throw new Error("Intentional render error!");

  return <div>This will never render.</div>;
}

export default BrokenComponent;