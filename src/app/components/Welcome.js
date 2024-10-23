'use client';

export default function Welcome({ onPromptClick }) {
  const prompts = [
    "What are the available properties?",
    "Can you tell me about the latest deals?",
    "How can I book a property viewing?",
    "What's the best neighborhood to invest in?"
  ];

  return (
    <div className="items-center justify-center w-fit max-w-4xl m-auto my-24">
        <div className="w-full pl-2">
      <h2 className="text-5xl mb-4 text-left w-fit mt-0 decor">Hello, Team</h2>
      <p className="text-5xl text-[#CAC4D0] text-left">How can I help you today?</p>
      </div>
      <div className="flex flex-wrap justify-start md:justify-center text-center sm:ml-2 mt-8 gap-4">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className="bg-[#ECE6F0] hover:bg-[#ded3e1] text-black h-[150px] w-full md:w-auto max-w-[80%] md:max-w-[180px] pt-1 pb-12 px-4 rounded-xl shadow-md transition-all duration-200 text-left"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
