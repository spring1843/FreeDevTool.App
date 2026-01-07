export default function HeaderV2() {
  return (
    <div className="w-full inline-flex justify-between items-center">
      <div className="w-72 h-20 pl-4 pr-6 py-3 relative bg-slate-900 border-r border-white/10 flex justify-between items-center">
        <div className="w-64 h-0 left-[20px] top-[82px] absolute outline outline-1 outline-offset-[-0.50px] outline-indigo-950"></div>
        <div className="flex justify-start items-center gap-2.5">
          <div className="p-[5px] bg-sky-500 rounded-lg flex justify-start items-center gap-2.5">
            <img className="w-8 h-8" src="/assets/android-chrome-192x192.png" alt="Logo" />
          </div>
          <div className="inline-flex flex-col justify-start items-start gap-0.5">
            <div className="justify-start text-white text-xl font-bold font-['Inter']">FreeDevTool</div>
            <div className="self-stretch justify-start text-white text-[10px] font-normal font-['Inter']">Secure Developer Tools</div>
          </div>
        </div>
        <div className="w-5 h-5 relative origin-top-left rotate-180 cursor-pointer">
          <div className="w-4 h-3.5 left-[1.67px] top-[2.50px] absolute outline outline-[1.47px] outline-offset-[-0.73px] outline-slate-300" />
          <div className="w-0 h-3.5 left-[12.08px] top-[2.50px] absolute outline outline-[1.47px] outline-offset-[-0.73px] outline-slate-300" />
          <div className="w-[0.83px] h-[2.50px] left-[15px] top-[5.83px] absolute outline outline-[1.47px] outline-offset-[-0.73px] outline-slate-300" />
        </div>
      </div>
      <div className="flex-1 h-20 pl-10 pr-8 py-4 bg-slate-900 border-b border-indigo-950 flex justify-between items-center">
        <div className="w-96 h-12 pl-3.5 pr-24 py-3 bg-white/5 rounded-xl shadow-[0px_2px_4px_0px_rgba(1,5,17,0.20)] flex justify-start items-center gap-2.5">
          <div className="flex justify-start items-center gap-2.5">
            <div className="w-5 h-5 relative overflow-hidden">
              <div className="w-4 h-4 left-[1.67px] top-[1.67px] absolute">
                <div className="w-3.5 h-3.5 left-[0.89px] top-[0.83px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
              </div>
            </div>
            <div className="opacity-60 justify-center text-slate-300 text-sm font-normal font-['Inter']">Search 47 tools... (Ctrl+S)</div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <div className="h-11 px-4 py-3 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-xl shadow-[0px_2.931162118911743px_14.655810356140137px_0px_rgba(99,102,241,0.30)] flex justify-start items-center gap-1.5 cursor-pointer hover:from-indigo-600 hover:to-violet-600 transition-all">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute">
                <div className="w-5 h-5 left-0 top-0 absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white" />
              </div>
            </div>
            <div className="text-center justify-center text-white text-base font-bold font-['Arial']">Demo Tour (47 tools)</div>
          </div>
          <div className="w-12 h-12 p-3 bg-white/5 rounded-xl flex justify-center items-center gap-2.5 overflow-hidden cursor-pointer hover:bg-white/10 transition-colors">
            <div className="w-7 h-7 relative overflow-hidden">
              <div className="w-5 h-5 left-[5.25px] top-[5.25px] absolute bg-slate-300" />
            </div>
          </div>
          <div className="w-12 h-12 p-3 bg-white/5 rounded-xl flex justify-center items-center gap-2.5 overflow-hidden cursor-pointer hover:bg-white/10 transition-colors">
            <div className="w-7 h-7 relative overflow-hidden">
              <div className="w-5 h-5 left-[5px] top-[23.56px] absolute origin-top-left -rotate-90">
                <div className="w-3.5 h-4 left-[2.50px] top-[1.67px] absolute outline outline-[1.47px] outline-offset-[-0.73px] outline-slate-300" />
                <div className="w-3.5 h-0 left-[2.50px] top-[12.08px] absolute outline outline-[1.47px] outline-offset-[-0.73px] outline-slate-300" />
                <div className="w-[2.50px] h-[0.83px] left-[11.67px] top-[15px] absolute outline outline-[1.47px] outline-offset-[-0.73px] outline-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
