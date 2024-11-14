import { useRef, useState } from 'react'

function InstructionList({ instructions, editable, addInstruction }: { instructions: string[], editable: boolean | undefined, addInstruction: any }) {
  const [currentInstruction, setCurrentInstruction] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function finalizeInstruction() {
    addInstruction(currentInstruction);
    setCurrentInstruction('');
    setTimeout(focus, 50);
  }

  if (instructions.length == 0 && !editable) {
    return (
      <div className="card-body border border-neutral border-opacity-10 rounded-b-2xl">
        <p className="text-lg opacity-50">No instructions found.</p>
      </div>
    )
  }

  return (
    <div className="card-body border border-neutral border-opacity-10 rounded-b-2xl" key={instructions.length}>
      <div className="text-lg">
        {instructions.map((instruction: string, index: number) => (
          <div key={index}>
            <h2 className="card-title">Step {index + 1}</h2>
            <p>{instruction}</p>
            <div className={`divider ${index == instructions.length - 1 ? 'hidden' : ''}`} />
          </div>
        ))}
        <div className={`divider ${!editable || instructions.length == 0 ? 'hidden' : ''}`} />
        <div className={`w-full flex gap-1 items-center ${editable ? '' : 'hidden'}`}>
          <input ref={inputRef}
            type="text" placeholder="Add instruction"
                 className="border-2 border-neutral-400 border-dashed p-2 text-center rounded-sm input w-full"
                 id="instructionSelector" onChange={(e) => setCurrentInstruction(e.currentTarget.value)} onKeyUp={(e) => {if (e.key == "Enter") finalizeInstruction()}} />
          <button onClick={finalizeInstruction} className="btn btn-square btn-ghost !p-0 text-4xl !flex flex-col">
            <p>+</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionList;
