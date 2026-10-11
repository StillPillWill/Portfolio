import { defineProject } from "../define.ts";

export default defineProject({
  slug: "csi",
  name: "CSI Research",
  tier: "flagship",
  status: "active",
  statusNote: "Active Research · 90% Speaker Recognition",
  start: 2025,
  end: "present",
  featured: 1,
  categories: ["research","ml","systems"],
  skills: ["ESP32","ESP-IDF","C/C++","PyTorch","CUDA","Signal processing","Native USB"],
  role: "Independent researcher",
  domain: "Computer Science & Embedded RF Sensing",
  summary: "ESP32 firmware, a 10,839 records/s USB capture path, and models that identify speakers from channel-state information alone.",
  headline: "Hearing sound through Wi‑Fi",
  kicker: "Research · embedded sensing",
  deck: "An ESP32 firmware, high-throughput native USB transport, and deep-learning pipeline built to evaluate acoustic sensing through Wi-Fi channel-state information—capturing 4.6B packets and 98 hours of synchronized audio to achieve 90% speaker recognition across 400 hours of training on $40 of hardware.",
  links: {
    repo: "https://github.com/StillPillWill/Research",
  },
  stats: [
    {
      to: 90,
      suffix: "%",
      label: "closed-set speaker recognition",
    },
    {
      to: 4.6,
      decimals: 1,
      suffix: "B",
      label: "CSI packets captured",
    },
    {
      to: 10839,
      label: "records/s over native USB, 0 drops",
    },
    {
      to: 40,
      prefix: "$",
      label: "total hardware cost",
    },
  ],
  specimen: "spectrogram",
  media: [],
  notes: [
    {
      label: "Research Hypothesis",
      title: "Can acoustic pressure waves modulate commodity Wi‑Fi subcarriers?",
      intent: "Determine whether sound vibrations altering antenna ground planes and surfaces impart extractable phase signatures onto 802.11 CSI.",
      body: "Sound waves induce microscopic surface vibrations in physical obstacles and antenna ground planes, altering RF signal propagation. While military radar or optical vibrometry achieves this with expensive lasers, this research evaluates whether sub-$5 ESP32-S3 and C6 microcontrollers can capture sufficient subcarrier phase and amplitude shifts to detect acoustic events and identify human speakers.",
      facts: [
        "Physical-layer OFDM",
        "ESP32-S3 / C6 silicon",
        "Origin: UCSC SIP 2025",
        "Non-line-of-sight sensing",
      ],
    },
    {
      label: "Transport Architecture",
      title: "Native USB bulk transfer sustained 10,839 records/s with zero dropouts.",
      intent: "Bypass OS network stack latency and standard serial baud rate limits that dropped packets at high frequencies.",
      body: "Initial experiments demonstrated that OS-level NIC polling introduced variable scheduling jitter and dropped up to 30% of packets above 1 kHz, destroying acoustic phase coherence. I wrote ESP32 firmware utilizing FreeRTOS ping-pong ring buffers and native USB CDC/bulk endpoints with 16-bit CRC framing and monotonic sequence counters. In 60-second continuous soak tests, the transport sustained 10,839 raw records/s (9.019 Mb/s) with 0 CRC corruptions, 0 sequence skips, and 0 host drops.",
      facts: ["10,839 records/s","60-second soak test","0 CRC errors or gaps","9.019 Mb/s sustained"],
    },
    {
      label: "Data Orchestration",
      title: "Hardware-synchronized audio capture and chunked binary storage.",
      intent: "Build a synchronized dataset pairing RF phase disturbances directly with calibrated acoustic ground truth.",
      body: "Supervised acoustic training requires exact temporal alignment between RF perturbations and acoustic waveforms. I developed a host-side collection daemon in Python that synchronizes dual microcontrollers with multi-channel audio input, streaming into chunked binary storage with index tables. This system compiled a corpus of 4.6 billion raw packets and 98 hours of paired audio on roughly $40 of total hardware.",
      facts: ["4.6B raw packets","98 hours paired audio","~$40 hardware BOM","Paired RF + audio"],
    },
    {
      label: "Empirical Results",
      title: "90% closed-set speaker recognition verified across 122 training runs.",
      intent: "Evaluate whether neural networks can extract speaker identity from raw subcarrier phase differences.",
      body: "Over 400 hours of GPU compute across 122 training iterations, convolutional and recurrent architectures trained on preprocessed subcarrier spectrograms achieved 90% speaker identification accuracy in closed-set evaluations, as well as reliable voice-activity event detection. This confirmed that acoustic signatures are preserved in raw subcarrier phase data despite environmental reflections.",
      facts: ["90% speaker ID","122 training runs","400 hours GPU compute","VAD verified"],
    },
    {
      label: "Scientific Boundaries",
      title: "Speech classification is demonstrated; continuous waveform reconstruction remains open.",
      intent: "Distinguish demonstrated speaker classification from unproven continuous speech synthesis.",
      body: "Documenting technical limitations clearly is essential. While speaker recognition and voice-activity detection are demonstrated, arbitrary acoustic waveform reconstruction (synthesizing continuous intelligible speech from raw RF alone) remains an unsolved research problem due to phase unwrapping ambiguities and hardware phase noise. Ongoing work focuses on spatial beamforming and antenna array diversity to improve SNR.",
      facts: [
        "Proven: Classification & VAD",
        "Open: Continuous audio synthesis",
        "Phase unwrapping limits",
      ],
    },
  ],
  seo: {
    title: "CSI Audio Sensing Research · Wi-Fi RF Capture & ML · William Nzive",
    description: "ESP32 firmware, native USB 10,839 records/s transport, and deep learning pipeline achieving 90% speaker recognition across 4.6B packets and 98 hours of audio.",
    ogTitle: "CSI Research — Audio Sensing through Wi-Fi CSI · William Nzive",
    ogDescription: "ESP32 firmware, native USB transport (10,839 records/s), and PyTorch ML models capturing 4.6 billion packets to investigate RF audio sensing.",
  },
});
