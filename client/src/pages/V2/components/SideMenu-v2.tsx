export default function SideMenuV2() {
  return (
    <div className="w-72 h-full px-3.5 pt-5 pb-4 bg-slate-900 outline outline-1 outline-offset-[-1px] outline-white/10 inline-flex flex-col justify-start items-start gap-5">
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="self-stretch h-11 px-4 py-2.5 bg-white/5 rounded-xl inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute">
                <div className="w-4 h-4 left-[1px] top-[1px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-teal-400" />
              </div>
            </div>
            <div className="justify-start text-teal-400 text-base font-semibold font-['Inter']">Home</div>
          </div>
          <div className="w-4 h-4 relative origin-top-left -rotate-90 opacity-0 overflow-hidden">
            <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute">
              <div className="w-2.5 h-1.5 left-[4px] top-[12px] absolute origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-teal-400" />
            </div>
          </div>
        </div>
        <div className="self-stretch h-11 px-4 py-2.5 bg-slate-900 rounded-xl inline-flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute">
                <div className="w-4 h-4 left-[1px] top-[1px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
              </div>
            </div>
            <div className="justify-start text-indigo-300 text-base font-normal font-['Inter']">Conversions</div>
          </div>
          <div className="w-4 h-4 relative overflow-hidden">
            <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute">
              <div className="w-1.5 h-2.5 left-[1.33px] top-[9.33px] absolute origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-center gap-1.5">
          <div className="self-stretch h-11 pl-14 pr-5 py-3 bg-slate-900/0 rounded inline-flex justify-start items-center gap-5 cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex justify-start items-center gap-5">
              <div className="justify-start text-indigo-300 text-sm font-normal font-['Inter']">Date Converter</div>
            </div>
          </div>
          <div className="self-stretch h-11 pl-14 pr-5 py-3 bg-slate-900/0 rounded flex flex-col justify-center items-start gap-5 cursor-pointer hover:bg-white/5 transition-colors">
            <div className="inline-flex justify-start items-center gap-5">
              <div className="justify-start text-indigo-300 text-sm font-normal font-['Inter']">JSON - YAML</div>
            </div>
          </div>
          <div className="self-stretch h-11 pl-14 pr-5 py-3 bg-slate-900/0 rounded flex flex-col justify-center items-start gap-5 cursor-pointer hover:bg-white/5 transition-colors">
            <div className="inline-flex justify-start items-center gap-5">
              <div className="justify-start text-indigo-300 text-sm font-normal font-['Inter']">Timezone Converter</div>
            </div>
          </div>
          <div className="self-stretch h-11 pl-14 pr-5 py-3 bg-slate-900 rounded flex flex-col justify-center items-start gap-5 cursor-pointer hover:bg-white/10 transition-colors">
            <div className="inline-flex justify-start items-center gap-5">
              <div className="justify-start text-indigo-300 text-sm font-normal font-['Inter']">Unit Converter</div>
            </div>
          </div>
          <div className="self-stretch h-11 pl-14 pr-5 py-3 bg-slate-900/0 rounded flex flex-col justify-center items-start gap-5 cursor-pointer hover:bg-white/5 transition-colors">
            <div className="inline-flex justify-start items-center gap-5">
              <div className="justify-start text-indigo-300 text-sm font-normal font-['Inter']">URL to JSON</div>
            </div>
          </div>
          <div className="self-stretch h-11 pl-14 pr-5 py-3 bg-slate-900/0 rounded flex flex-col justify-center items-start gap-5 cursor-pointer hover:bg-white/5 transition-colors">
            <div className="inline-flex justify-start items-center gap-5">
              <div className="justify-start text-indigo-300 text-sm font-normal font-['Inter']">CSV to JSON</div>
            </div>
          </div>
          <div className="self-stretch h-11 pl-14 pr-5 py-3 bg-slate-900/0 rounded flex flex-col justify-center items-start gap-5 cursor-pointer hover:bg-white/5 transition-colors">
            <div className="inline-flex justify-start items-center gap-5">
              <div className="justify-start text-indigo-300 text-sm font-normal font-['Inter']">Number Base Converter</div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-11 px-4 py-2.5 bg-slate-900 rounded-xl inline-flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute">
                <div className="w-4 h-4 left-[1px] top-[1px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
              </div>
            </div>
            <div className="justify-start text-indigo-300 text-base font-normal font-['Inter']">Formatters</div>
          </div>
          <div className="w-4 h-4 relative origin-top-left -rotate-90 overflow-hidden">
            <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute">
              <div className="w-2.5 h-1.5 left-[4px] top-[12px] absolute origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
            </div>
          </div>
        </div>
        <div className="self-stretch h-11 px-4 py-2.5 bg-slate-900 rounded-xl inline-flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute">
                <div className="w-4 h-4 left-[1px] top-[1px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
              </div>
            </div>
            <div className="justify-start text-indigo-300 text-base font-normal font-['Inter']">Encoders</div>
          </div>
          <div className="w-4 h-4 relative origin-top-left -rotate-90 overflow-hidden">
            <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute">
              <div className="w-2.5 h-1.5 left-[4px] top-[12px] absolute origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
            </div>
          </div>
        </div>
        <div className="self-stretch h-11 px-4 py-2.5 bg-slate-900 rounded-xl inline-flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute">
                <div className="w-4 h-4 left-[1px] top-[1px] absolute rounded-[1px] outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
              </div>
            </div>
            <div className="justify-start text-indigo-300 text-base font-normal font-['Inter']">Text Tools</div>
          </div>
          <div className="w-4 h-4 relative origin-top-left -rotate-90 overflow-hidden">
            <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute">
              <div className="w-2.5 h-1.5 left-[4px] top-[12px] absolute origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
            </div>
          </div>
        </div>
        <div className="self-stretch h-11 px-4 py-2.5 bg-slate-900 rounded-xl inline-flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute">
                <div className="w-4 h-4 left-[1px] top-[1px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
              </div>
            </div>
            <div className="justify-start text-indigo-300 text-base font-normal font-['Inter']">Time Tools</div>
          </div>
          <div className="w-4 h-4 relative origin-top-left -rotate-90 overflow-hidden">
            <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute">
              <div className="w-2.5 h-1.5 left-[4px] top-[12px] absolute origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
            </div>
          </div>
        </div>
        <div className="self-stretch h-11 px-4 py-2.5 bg-slate-900 rounded-xl inline-flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute">
                <div className="w-5 h-4 left-0 top-[2px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
              </div>
            </div>
            <div className="justify-start text-indigo-300 text-base font-normal font-['Inter']">Financial Tools</div>
          </div>
          <div className="w-4 h-4 relative origin-top-left -rotate-90 overflow-hidden">
            <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute">
              <div className="w-2.5 h-1.5 left-[4px] top-[12px] absolute origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
            </div>
          </div>
        </div>
        <div className="self-stretch h-11 px-4 py-2.5 bg-slate-900 rounded-xl inline-flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute">
                <div className="w-4 h-4 left-[1px] top-[1px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
              </div>
            </div>
            <div className="justify-start text-indigo-300 text-base font-normal font-['Inter']">Color Tools</div>
          </div>
          <div className="w-4 h-4 relative origin-top-left -rotate-90 overflow-hidden">
            <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute">
              <div className="w-2.5 h-1.5 left-[4px] top-[12px] absolute origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
            </div>
          </div>
        </div>
        <div className="self-stretch h-11 px-4 py-2.5 bg-slate-900 rounded-xl inline-flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
          <div className="flex justify-start items-center gap-4">
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-5 h-5 left-[2px] top-[2px] absolute">
                <div className="w-4 h-4 left-[1px] top-[1px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
              </div>
            </div>
            <div className="justify-start text-indigo-300 text-base font-normal font-['Inter']">System</div>
          </div>
          <div className="w-4 h-4 relative origin-top-left -rotate-90 overflow-hidden">
            <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute">
              <div className="w-2.5 h-1.5 left-[4px] top-[12px] absolute origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-slate-300" />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-col justify-end items-start gap-1">
        <div className="self-stretch px-3 py-2 inline-flex justify-start items-center gap-2 cursor-pointer hover:bg-white/5 rounded transition-colors">
          <div className="w-5 h-5 relative overflow-hidden">
            <div className="w-4 h-4 left-[1.83px] top-[1.83px] absolute bg-neutral-400" />
          </div>
          <div className="flex-1 flex justify-start items-center gap-1.5">
            <div className="justify-end text-neutral-400 text-sm font-medium font-['Inter'] leading-5">Settings</div>
          </div>
        </div>
        <div className="self-stretch px-3 py-2 inline-flex justify-start items-center gap-2 cursor-pointer hover:bg-white/5 rounded transition-colors">
          <div className="w-5 h-5 relative overflow-hidden">
            <div className="w-3.5 h-3.5 left-[2.50px] top-[2.50px] absolute bg-neutral-400" />
          </div>
          <div className="flex-1 flex justify-start items-center gap-1.5">
            <div className="justify-end text-neutral-400 text-sm font-medium font-['Inter'] leading-5">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
