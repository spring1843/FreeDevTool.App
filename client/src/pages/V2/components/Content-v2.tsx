export default function ContentV2() {
  const tools = [
    {
      title: "Date Converter",
      shortcut: "Ctrl+Shift+1",
      description: "Convert dates between various formats including ISO 8601, Unix timestamps, and more."
    },
    {
      title: "JSON to YAML",
      shortcut: "Ctrl+Shift+2",
      description: "Transform JSON data into YAML format, making your configuration files more human-readable."
    },
    {
      title: "Timezone Converter",
      shortcut: "Ctrl+Shift+3",
      description: "Convert times between different timezones with support for daylight saving time."
    },
    {
      title: "Unit Converter",
      shortcut: "Ctrl+Shift+4",
      description: "Convert between different units of measurement including length, weight, and temperature."
    },
    {
      title: "URL to JSON",
      shortcut: "Ctrl+Shift+5",
      description: "Parse URL query parameters and convert them into JSON format for easy manipulation."
    },
    {
      title: "CSV to JSON",
      shortcut: "Ctrl+Shift+6",
      description: "Transform CSV data into JSON format for modern data processing workflows."
    }
  ];

  return (
    <div className="flex-1 p-5 bg-slate-900 border-b border-indigo-950 inline-flex flex-col justify-start items-start gap-6 overflow-y-auto">
      <div className="self-stretch flex flex-col justify-start items-start">
        <div className="self-stretch justify-end text-white text-2xl font-semibold font-['Inter'] leading-6">Welcome Back!</div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-center gap-4">
        <div className="self-stretch h-44 relative bg-white/5 rounded-2xl outline outline-[0.73px] outline-offset-[-0.73px] outline-white/10 backdrop-blur overflow-hidden">
          <div className="w-[900.33px] h-[900.33px] left-[429.67px] top-[-360.33px] absolute opacity-50 bg-[radial-gradient(ellipse_70.71%_70.71%_at_50.00%_50.00%,_rgba(34,_211,_238,_0.15)_0%,_rgba(34,_211,_238,_0)_70%)] rounded-[450.16px]" />
          <div className="w-full max-w-[556px] left-[38px] top-[30px] absolute inline-flex flex-col justify-start items-start gap-3.5">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch justify-end text-white text-xl font-medium font-['Inter'] leading-6">Your Data Never Leaves Your Device</div>
              <div className="self-stretch justify-center text-slate-300 text-base font-normal font-['Inter'] leading-6">No back-end design. All processing happens entirely in your browser. Your data is never sent to any server.</div>
            </div>
            <div className="inline-flex justify-start items-center gap-2">
              <div className="px-2.5 py-1 bg-blue-500/10 rounded outline outline-[0.73px] outline-offset-[-0.73px] outline-blue-500 inline-flex flex-col justify-start items-start">
                <div className="justify-center text-blue-400 text-[8.79px] font-semibold font-['Inter']">Open Source</div>
              </div>
              <div className="px-2.5 py-1 bg-emerald-500/10 rounded outline outline-[0.73px] outline-offset-[-0.73px] outline-emerald-500 inline-flex flex-col justify-start items-start">
                <div className="justify-center text-emerald-400 text-[8.79px] font-semibold font-['Inter']">Free</div>
              </div>
              <div className="px-2.5 py-1 bg-violet-500/10 rounded outline outline-[0.73px] outline-offset-[-0.73px] outline-violet-500 inline-flex flex-col justify-start items-start">
                <div className="justify-center text-violet-400 text-[8.79px] font-semibold font-['Inter']">Offline</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <div className="self-stretch inline-flex justify-start items-center gap-3 flex-wrap content-center">
          <div className="justify-end text-white text-2xl font-semibold font-['Inter'] leading-6">Conversions</div>
          <div className="px-2.5 py-1 bg-white/10 rounded-md outline outline-[0.75px] outline-offset-[-0.75px] outline-white/20 flex justify-start items-center">
            <div className="justify-center text-slate-300 text-xs font-bold font-['Inter']">6 Tools</div>
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-3.5 flex-wrap content-start">
          {tools.map((tool, index) => (
            <div key={index} className="flex-1 min-w-64 px-5 py-5 bg-gradient-to-br from-white/0 to-white/5 rounded-xl outline outline-[0.75px] outline-offset-[-0.75px] outline-white/10 backdrop-blur inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden hover:outline-teal-400/50 transition-all cursor-pointer group">
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="w-9 h-9 pt-2 pb-1.5 bg-white/10 rounded-lg outline outline-[0.75px] outline-offset-[-0.75px] outline-white/20 inline-flex justify-center items-center group-hover:bg-white/20 transition-colors">
                    <div className="w-5 h-5 relative overflow-hidden">
                      <div className="w-3.5 h-3.5 left-[3.33px] top-[1.67px] absolute outline outline-2 outline-offset-[-1px] outline-slate-300" />
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <div className="self-stretch inline-flex justify-between items-center">
                      <div className="flex-1 inline-flex flex-col justify-start items-start">
                        <div className="justify-center text-slate-100 text-sm font-semibold font-['Inter']">{tool.title}</div>
                      </div>
                      <div className="justify-center text-slate-300 text-[9.56px] font-normal font-['Inter']">{tool.shortcut}</div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start">
                      <div className="justify-center text-slate-400 text-xs font-normal font-['Inter'] leading-4">{tool.description}</div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-9 px-2 py-1 bg-white/10 rounded-xl outline outline-[0.75px] outline-offset-[-0.75px] outline-white/20 inline-flex justify-center items-center gap-1.5 group-hover:bg-teal-400/20 group-hover:outline-teal-400 transition-all">
                  <div className="justify-center text-teal-400 text-sm font-normal font-['Inter']">Open Tool</div>
                  <div className="w-4 h-4 relative overflow-hidden">
                    <div className="w-4 h-4 left-0 top-0 absolute">
                      <div className="w-4 h-4 left-0 top-0 absolute" />
                      <div className="w-1.5 h-1.5 left-[11.33px] top-[11.33px] absolute origin-top-left rotate-180 outline outline-[1.33px] outline-offset-[-0.67px] outline-teal-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
