const GlitchWords = ({ parts }: { parts: string[] }) => (
  <>
    {parts.map((word) => {
      return (
        <div key={word} className='relative group'>
          <span className='word relative z-10 whitespace-nowrap'>{word}</span>
          <span className='absolute top-px left-px w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-cyan-500 to-teal-500 whitespace-nowrap'>
            {word}
          </span>
        </div>
      );
    })}
  </>
);

export default GlitchWords;
