function InstructionList({ instructions }: { instructions: string[] }) {
  return (
    <div className="card-body border border-neutral border-opacity-10 rounded-b-2xl">
      <div className="text-lg">
        {instructions.map((instruction: string, index: number) => (
          <div key={index}>
            <h2 className="card-title">Step {index + 1}</h2>
            <p>{instruction}</p>
            <div className={`divider ${index == instructions.length - 1 ? 'hidden' : ''}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstructionList;
