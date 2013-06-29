    // Song data
    var song = {
      // Song length in seconds (how much data to generate)
      songLen: 158,  // Tune this to fit your needs!

      songData: [
        { // Instrument 0
          // Oscillator 1
          osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 192,
          osc1_waveform: 2,
          // Oscillator 2
          osc2_oct: 7,
          osc2_det: 0,
          osc2_detune: 9,
          osc2_xenv: 0,
          osc2_vol: 192,
          osc2_waveform: 2,
          // Noise oscillator
          noise_fader: 39,
          // Envelope
          env_attack: 88,
          env_sustain: 1584,
          env_release: 1075,
          env_master: 235,
          // Effects
          fx_filter: 3,
          fx_freq: 1610,
          fx_resonance: 156,
          fx_delay_time: 3,
          fx_delay_amt: 16,
          fx_pan_freq: 4,
          fx_pan_amt: 131,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 1,
          lfo_freq: 4,
          lfo_amt: 111,
          lfo_waveform: 1,
          // Patterns
          p: [0,0,1,2,1,2,1,2,1,2,1,2,0,0,5,6,3,4,1,2,1,2,1,2,3,4,3,4,3,4,3,4,3,4,3,4,0,0,0,0,7,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135]},
            {n: [138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138]},
            {n: [0,0,135,135,0,0,135,135,0,0,135,135,0,0,135,135,0,0,135,135,0,0,135,135,0,0,135,135,0,0,135,135]},
            {n: [0,0,138,138,0,0,138,138,0,0,138,138,0,0,138,138,0,0,138,138,0,0,138,138,0,0,138,138,0,0,138,138]},
            {n: [0,0,135,135,0,0,135,135,0,0,0,0,0,0,0,0,0,0,135,135,0,0,135,135,0,0,0,0,0,0,0,0]},
            {n: [0,0,138,138,0,0,138,138,0,0,0,0,0,0,0,0,0,0,138,138,0,0,138,138,0,0,0,0,0,0,0,0]},
            {n: [171,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        },
        { // Instrument 1
          // Oscillator 1
          osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 1,
          osc1_vol: 255,
          osc1_waveform: 0,
          // Oscillator 2
          osc2_oct: 7,
          osc2_det: 0,
          osc2_detune: 0,
          osc2_xenv: 1,
          osc2_vol: 255,
          osc2_waveform: 0,
          // Noise oscillator
          noise_fader: 0,
          // Envelope
          env_attack: 49,
          env_sustain: 150,
          env_release: 10614,
          env_master: 200,
          // Effects
          fx_filter: 2,
          fx_freq: 600,
          fx_resonance: 254,
          fx_delay_time: 2,
          fx_delay_amt: 24,
          fx_pan_freq: 0,
          fx_pan_amt: 0,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 0,
          lfo_freq: 0,
          lfo_amt: 0,
          lfo_waveform: 0,
          // Patterns
          p: [0,2,1,4,1,5,1,6,1,1,1,7,3,8,0,0,1,5,1,6,0,0,0,2,1,5,1,6,1,4,1,6,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,0,0,0,147,147,0,0]},
            {n: [147,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,147,147,0,147,0]},
            {n: [147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,147,0,147,0,147,0]},
            {n: [147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,0,147,147,0,147,0,147,147]},
            {n: [147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,147,0,0,0,0,0,0,0,0,0,0,0,0,0,147,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        },
        { // Instrument 2
          // Oscillator 1
          osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 1,
          osc1_vol: 255,
          osc1_waveform: 1,
          // Oscillator 2
          osc2_oct: 8,
          osc2_det: 0,
          osc2_detune: 0,
          osc2_xenv: 1,
          osc2_vol: 208,
          osc2_waveform: 0,
          // Noise oscillator
          noise_fader: 255,
          // Envelope
          env_attack: 50,
          env_sustain: 150,
          env_release: 12631,
          env_master: 229,
          // Effects
          fx_filter: 1,
          fx_freq: 7931,
          fx_resonance: 143,
          fx_delay_time: 4,
          fx_delay_amt: 24,
          fx_pan_freq: 0,
          fx_pan_amt: 20,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 1,
          lfo_freq: 5,
          lfo_amt: 64,
          lfo_waveform: 0,
          // Patterns
          p: [0,0,0,4,1,2,1,3,0,0,0,0,0,5,0,0,1,2,1,3,0,0,0,4,1,2,1,3,0,4,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0]},
            {n: [0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0,0,0,147,0,147,0,147,0]},
            {n: [0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0,0,0,0,0,147,0,0,0,0,135,147,0,147,0,147,147]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,0,0,147,147,0,147,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        },
        { // Instrument 3
          // Oscillator 1
          osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 192,
          osc1_waveform: 2,
          // Oscillator 2
          osc2_oct: 7,
          osc2_det: 0,
          osc2_detune: 0,
          osc2_xenv: 0,
          osc2_vol: 201,
          osc2_waveform: 3,
          // Noise oscillator
          noise_fader: 0,
          // Envelope
          env_attack: 100,
          env_sustain: 150,
          env_release: 13636,
          env_master: 191,
          // Effects
          fx_filter: 2,
          fx_freq: 5839,
          fx_resonance: 191,
          fx_delay_time: 6,
          fx_delay_amt: 121,
          fx_pan_freq: 6,
          fx_pan_amt: 147,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 1,
          lfo_freq: 4,
          lfo_amt: 123,
          lfo_waveform: 1,
          // Patterns
          p: [1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,0,0,0,0,3,4,3,4,3,4,3,4,3,4,3,4,3,4,1,5,6,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [123,0,0,0,0,0,0,0,135,0,0,0,0,0,0,0,123,0,0,0,0,0,0,0,135,0,0,0,0,0,0,0]},
            {n: [126,0,0,0,0,0,0,0,138,0,0,0,0,0,0,0,126,0,0,0,0,0,0,0,138,0,0,0,0,0,0,0]},
            {n: [123,0,0,0,135,0,0,0,0,123,123,0,135,0,0,0,123,0,0,0,135,0,0,0,0,123,123,0,135,0,123,0]},
            {n: [126,0,0,0,138,0,0,0,0,126,126,0,138,0,0,0,126,0,0,0,138,0,0,0,0,126,126,0,138,0,126,0]},
            {n: [123,123,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,123,130,135,142,147,154,159,166]},
            {n: [171,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        },
        { // Instrument 4
          // Oscillator 1
          osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 255,
          osc1_waveform: 2,
          // Oscillator 2
          osc2_oct: 8,
          osc2_det: 0,
          osc2_detune: 18,
          osc2_xenv: 0,
          osc2_vol: 255,
          osc2_waveform: 3,
          // Noise oscillator
          noise_fader: 0,
          // Envelope
          env_attack: 21074,
          env_sustain: 56363,
          env_release: 100000,
          env_master: 199,
          // Effects
          fx_filter: 2,
          fx_freq: 948,
          fx_resonance: 92,
          fx_delay_time: 7,
          fx_delay_amt: 60,
          fx_pan_freq: 3,
          fx_pan_amt: 100,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 1,
          lfo_freq: 7,
          lfo_amt: 138,
          lfo_waveform: 3,
          // Patterns
          p: [1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,4,3,5,0,0,0,0,1,2,1,2,6,7,6,8,0,0,0,0,9,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [123,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [123,166,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [126,169,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [126,162,0,0,0,0,0,0,166,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [111,123,135,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [114,126,133,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [126,138,133,0,0,0,0,0,0,0,0,0,145,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [99,111,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        },
        { // Instrument 5
          // Oscillator 1
          osc1_oct: 8,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 0,
          osc1_waveform: 0,
          // Oscillator 2
          osc2_oct: 8,
          osc2_det: 0,
          osc2_detune: 0,
          osc2_xenv: 0,
          osc2_vol: 0,
          osc2_waveform: 0,
          // Noise oscillator
          noise_fader: 60,
          // Envelope
          env_attack: 50,
          env_sustain: 419,
          env_release: 4607,
          env_master: 182,
          // Effects
          fx_filter: 1,
          fx_freq: 10332,
          fx_resonance: 120,
          fx_delay_time: 4,
          fx_delay_amt: 16,
          fx_pan_freq: 5,
          fx_pan_amt: 108,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 0,
          lfo_freq: 5,
          lfo_amt: 187,
          lfo_waveform: 0,
          // Patterns
          p: [0,0,0,2,1,1,1,1,0,0,0,4,3,5,3,3,3,3,3,3,6,6,6,6,3,3,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,159,159,159,0,159,159,159,0]},
            {n: [0,0,0,0,159,0,0,0,0,0,0,0,159,0,0,0,0,0,0,0,159,0,0,0,0,0,159,0,0,0,159,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,0,0,0]},
            {n: [0,0,0,0,159,0,0,0,0,0,0,0,159,0,0,0,0,0,0,0,159,0,0,0,159,159,159,159,0,159,159,159]},
            {n: [0,159,159,0,159,0,159,159,0,159,159,0,159,0,159,0,0,159,159,0,159,0,159,159,0,159,159,0,159,0,0,159]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        },
        { // Instrument 6
          // Oscillator 1
          osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 255,
          osc1_waveform: 2,
          // Oscillator 2
          osc2_oct: 8,
          osc2_det: 0,
          osc2_detune: 5,
          osc2_xenv: 0,
          osc2_vol: 255,
          osc2_waveform: 2,
          // Noise oscillator
          noise_fader: 48,
          // Envelope
          env_attack: 5970,
          env_sustain: 88,
          env_release: 18442,
          env_master: 255,
          // Effects
          fx_filter: 2,
          fx_freq: 3657,
          fx_resonance: 95,
          fx_delay_time: 6,
          fx_delay_amt: 147,
          fx_pan_freq: 1,
          fx_pan_amt: 81,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 1,
          lfo_freq: 3,
          lfo_amt: 195,
          lfo_waveform: 0,
          // Patterns
          p: [0,0,0,0,0,0,0,0,1,1,1,1,2,3,2,3,2,3,2,3,0,0,0,0,0,0,0,0,2,3,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [147,0,154,0,0,0,0,0,150,0,157,0,0,0,0,0,152,0,159,0,0,0,0,0,0,0,0,0,150,0,149,0]},
            {n: [147,0,154,0,111,0,0,0,150,0,157,0,111,0,0,0,152,0,159,0,111,0,0,0,0,0,119,0,150,0,149,0]},
            {n: [147,0,154,0,114,0,0,0,150,0,157,0,114,0,0,0,152,0,159,0,114,0,0,0,0,0,121,0,150,0,149,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        },
        { // Instrument 7
          // Oscillator 1
          osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 255,
          osc1_waveform: 3,
          // Oscillator 2
          osc2_oct: 8,
          osc2_det: 0,
          osc2_detune: 0,
          osc2_xenv: 0,
          osc2_vol: 255,
          osc2_waveform: 0,
          // Noise oscillator
          noise_fader: 127,
          // Envelope
          env_attack: 22,
          env_sustain: 22,
          env_release: 2193,
          env_master: 255,
          // Effects
          fx_filter: 3,
          fx_freq: 4067,
          fx_resonance: 176,
          fx_delay_time: 4,
          fx_delay_amt: 144,
          fx_pan_freq: 2,
          fx_pan_amt: 84,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 1,
          lfo_freq: 3,
          lfo_amt: 96,
          lfo_waveform: 0,
          // Patterns
          p: [0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,3,1,2,1,3,1,2,1,3,0,0,1,3,1,2,1,3,1,2,1,3,0,0,0,0,0,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [147,0,0,0,159,0,166,0,162,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [145,0,0,0,159,0,171,0,169,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [145,0,0,0,159,0,169,0,166,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,162,0,164,0,161,0,162,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        }
      ],
      rowLen: 5168,   // In sample lengths
      endPattern: 42  // End pattern
    };
