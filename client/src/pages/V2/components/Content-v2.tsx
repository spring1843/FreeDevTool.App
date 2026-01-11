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
    <div style={{width: '100%', height: '100%', padding: 20, background: '#081028', borderBottom: '1px #111F49 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'inline-flex', overflow: 'auto'}}>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', display: 'flex', flexDirection: 'column', color: 'white', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', lineHeight: '24px', wordWrap: 'break-word'}}>Welcome Back!</div>
      </div>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', height: 180, position: 'relative', background: 'rgba(255, 255, 255, 0.04)', overflow: 'hidden', borderRadius: 14.66, outline: '0.73px rgba(255, 255, 255, 0.10) solid', outlineOffset: '-0.73px', backdropFilter: 'blur(7.33px)'}}>
          <div style={{width: 900.33, height: 900.33, left: 429.67, top: -360.33, position: 'absolute', opacity: 0.50, background: 'radial-gradient(ellipse 70.71% 70.71% at 50.00% 50.00%, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0) 70%)', borderRadius: 450.16}} />
          <div style={{width: 556, left: 38, top: 30, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 14, display: 'inline-flex'}}>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
              <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', display: 'flex', flexDirection: 'column', color: 'white', fontSize: 22, fontFamily: 'Inter', fontWeight: '500', lineHeight: '24px', wordWrap: 'break-word'}}>Your Data Never Leaves Your Device</div>
              <div style={{alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#AEB9E1', fontSize: 17, fontFamily: 'Inter', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word'}}>No back-end design. All processing happens entirely in your browser. Your data is never sent to any server.</div>
            </div>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8.79, display: 'inline-flex'}}>
              <div style={{paddingLeft: 10.26, paddingRight: 10.26, paddingTop: 4.40, paddingBottom: 4.40, background: 'rgba(59, 130, 246, 0.10)', borderRadius: 4.40, outline: '0.73px #3B82F6 solid', outlineOffset: '-0.73px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#60A5FA', fontSize: 8.79, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Open Source</div>
              </div>
              <div style={{paddingLeft: 10.26, paddingRight: 10.26, paddingTop: 4.40, paddingBottom: 4.40, background: 'rgba(16, 185, 129, 0.10)', borderRadius: 4.40, outline: '0.73px #10B981 solid', outlineOffset: '-0.73px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#34D399', fontSize: 8.79, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Free</div>
              </div>
              <div style={{paddingLeft: 10.26, paddingRight: 10.26, paddingTop: 4.40, paddingBottom: 4.40, background: 'rgba(139, 92, 246, 0.10)', borderRadius: 4.40, outline: '0.73px #8B5CF6 solid', outlineOffset: '-0.73px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#A78BFA', fontSize: 8.79, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Offline</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 11.96, display: 'inline-flex', flexWrap: 'wrap', alignContent: 'center'}}>
          <div style={{justifyContent: 'flex-end', display: 'flex', flexDirection: 'column', color: 'white', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', lineHeight: '24px', wordWrap: 'break-word'}}>Conversions</div>
          <div style={{paddingLeft: 10.46, paddingRight: 10.46, paddingTop: 4.48, paddingBottom: 4.48, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 5.98, outline: '0.75px rgba(255, 255, 255, 0.15) solid', outlineOffset: '-0.75px', justifyContent: 'flex-start', alignItems: 'center', display: 'flex'}}>
            <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#AEB9E1', fontSize: 10.46, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>6 Tools</div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 14, display: 'inline-flex', flexWrap: 'wrap', alignContent: 'flex-start'}}>
          {tools.map((tool, index) => (
            <div key={index} style={{flex: '1 1 0', minWidth: 270, paddingLeft: 22, paddingRight: 22, paddingTop: 20, paddingBottom: 20, background: 'linear-gradient(149deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.04) 100%)', overflow: 'hidden', borderRadius: 11.96, outline: '0.75px rgba(255, 255, 255, 0.12) solid', outlineOffset: '-0.75px', backdropFilter: 'blur(7.47px)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex', cursor: 'pointer'}}>
              <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
                <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 13, display: 'flex'}}>
                  <div style={{width: 35.87, height: 35.87, paddingTop: 7.47, paddingBottom: 6.72, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 7.47, outline: '0.75px rgba(255, 255, 255, 0.15) solid', outlineOffset: '-0.75px', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
                      <div style={{width: 13.33, height: 15, left: 3.33, top: 1.67, position: 'absolute', outline: '2px #AEB9E1 solid', outlineOffset: '-1px'}} />
                    </div>
                  </div>
                  <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 7, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
                      <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                        <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#F1F5F9', fontSize: 14.94, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>{tool.title}</div>
                      </div>
                      <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#AEB9E1', fontSize: 9.56, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{tool.shortcut}</div>
                    </div>
                    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                      <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#94A3B8', fontSize: 10.76, fontFamily: 'Inter', fontWeight: '400', lineHeight: '17.19px', wordWrap: 'break-word'}}>{tool.description}</div>
                    </div>
                  </div>
                </div>
                <div style={{alignSelf: 'stretch', height: 38, paddingLeft: 8.97, paddingRight: 8.97, paddingTop: 4.48, paddingBottom: 4.48, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 12, outline: '0.75px rgba(255, 255, 255, 0.15) solid', outlineOffset: '-0.75px', justifyContent: 'center', alignItems: 'center', gap: 6, display: 'inline-flex'}}>
                  <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#55D6FF', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Open Tool</div>
                  <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
                    <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute'}}>
                      <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute'}} />
                      <div style={{width: 6.67, height: 6.67, left: 11.33, top: 11.33, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1.33px #55D6FF solid', outlineOffset: '-0.67px'}} />
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
