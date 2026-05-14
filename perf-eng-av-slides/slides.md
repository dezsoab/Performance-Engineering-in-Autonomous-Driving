---
theme: apple-basic
class: text-center
transition: slide-up
---

<img src="/fh-green-bg.jpg" class="absolute inset-0 w-full h-full object-cover -z-10" />

<div class="relative z-10 flex flex-col justify-center items-center h-full mt-25">

<!-- Slide 1 -->
# Performance Engineering in Autonomous Driving
Comparing latency and throughput of vision and ranging data pipelines

<br>
<br>

Author: Dezső Binder
<br>
Supervisor: Johannes Feiner

</div>

---
transition: slide-up
---
<!-- Slide 2 -->
# Agenda

<div class="grid grid-cols-3 gap-5 mt-12">
  
  <div v-click.fade-in class="p-5 rounded-xl border border-white/20 bg-white/5">
    <div class="font-mono text-xs text-blue-400 mb-1">01</div>
    <div class="text-xl font-semibold">Motivation</div>
    <div class="text-sm opacity-70 mt-2">Industry Context & Tesla FSD</div>
  </div>
  
  <div v-click.fade-in class="p-5 rounded-xl border border-white/20 bg-white/5">
    <div class="font-mono text-xs text-emerald-400 mb-1">02</div>
    <div class="text-xl font-semibold">The Problem</div>
    <div class="text-sm opacity-70 mt-2">Sensor Blindness & Constraints</div>
  </div>

  <div v-click.fade-in class="p-5 rounded-xl border border-white/20 bg-white/5">
    <div class="font-mono text-xs text-purple-400 mb-1">03</div>
    <div class="text-xl font-semibold">Architecture</div>
    <div class="text-sm opacity-70 mt-2">Fusion & Asymmetric Trust</div>
  </div>

  <div v-click.fade-in class="p-5 rounded-xl border border-white/20 bg-white/5">
    <div class="font-mono text-xs text-yellow-400 mb-1">04</div>
    <div class="text-xl font-semibold">Implementation</div>
    <div class="text-sm opacity-70 mt-2">3-Ray Scan Optimization</div>
  </div>

  <div v-click.fade-in class="p-5 rounded-xl border border-white/20 bg-white/5">
    <div class="font-mono text-xs text-orange-400 mb-1">05</div>
    <div class="text-xl font-semibold">Results</div>
    <div class="text-sm opacity-70 mt-2">Latency & Robustness Benchmarks</div>
  </div>

  <div v-click.fade-in class="p-5 rounded-xl border border-white/20 bg-white/5">
    <div class="font-mono text-xs text-red-400 mb-1">06</div>
    <div class="text-xl font-semibold">Conclusion</div>
    <div class="text-sm opacity-70 mt-2">Summary & Future Outlook</div>
  </div>

</div>

<!-- Slide 3 -->
---
transition: slide-up
---

# Motivation

<div class="grid grid-cols-2 gap-10 mt-15">

  <div v-click class="duration-800 text-center">
    <img src="/juniper.jpg" class="rounded-3xl shadow-2xl border border-white/10 mb-6 w-full aspect-video object-cover" />
    <h2 class="text-3xl font-bold tracking-tight">Tesla</h2>
    <p class="opacity-50 mt-2">The "Human" Approach <br/>Cameras Only</p>
  </div>

  <div v-click class="duration-800 text-center">
    <img src="/waymo.jpg" class="rounded-3xl shadow-2xl border border-white/10 mb-6 w-full aspect-video object-cover" />
    <h2 class="text-3xl font-bold tracking-tight text-emerald-400">Waymo</h2>
    <p class="opacity-50 mt-2">The "Robot" Approach <br/>LiDAR + Radar</p>
  </div>

</div>

<!-- Slide 4 -->
---
transition: slide-up
---

# The Problem

<div class="grid grid-cols-3 gap-8 mt-10">

  <div v-click="1" class="duration-800 p-8 rounded-3xl border border-white/10 bg-white/5 text-center">
    <div class="text-xs font-mono opacity-40 mb-0 uppercase tracking-widest">RQ1</div>
    <h2 class="!text-3xl !font-extrabold !text-emerald-400">Accuracy</h2>
    <p class="opacity-50 mt-4 text-xs">Obstacle blindness.</p>
    <div class="relative w-full aspect-video mt-6 rounded-xl overflow-hidden border border-white/10">
      <img v-click="2" src="/bottle-far.png" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" />
      <img v-click="3" src="/bottle-close.png" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" />
    </div>
    <p v-click="3" class="text-[10px] opacity-40 mt-2 transition-opacity duration-1000">Vision Failure at < 25cm</p>
  </div>

  <div v-click="4" class="duration-800 p-8 rounded-3xl border border-white/10 bg-white/5 text-center">
    <div class="text-xs font-mono opacity-40 mb-0 uppercase tracking-widest">RQ2</div>
    <h2 class="!text-3xl !font-extrabold !text-blue-400">Efficiency</h2>
    <p class="opacity-50 mt-4 text-xs">25ms constraint.</p>
    <div v-click="5" class="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
      <div class="text-xs font-bold text-blue-400 uppercase tracking-tighter">Human Threshold</div>
      <div class="text-2xl font-bold">~13ms</div>
      <p class="text-[10px] opacity-40 mt-1 italic">Target: Real-Time Parity</p>
    </div>
  </div>

  <div v-click="6" class="duration-800 p-8 rounded-3xl border border-white/10 bg-white/5 text-center flex flex-col justify-between">
    <div>
      <div class="text-xs font-mono opacity-40 mb-0 uppercase tracking-widest">RQ3</div>
      <h2 class="!text-3xl !font-extrabold !text-purple-400">Robustness</h2>
      <p class="opacity-50 mt-4 text-xs">Uncontrolled worlds.</p>
    </div>
  </div>

</div>


<!-- Slide 5 -->
---
layout: center
transition: slide-up
---

# Uncontrolled environment

<div class="mt-8 rounded-3xl overflow-hidden border border-white/10 shadow-2xl w-full max-w-3xl mx-auto bg-black">
  <video autoplay loop muted playsinline class="w-full h-full object-cover">
    <source src="/demo.mp4" type="video/mp4">
  </video>
</div>