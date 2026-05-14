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

<!-- Slide 2: The Hook & Background

Action: Pick up the physical rover skeleton.

Content: Introduce the industry divide. Tell about the relevance as Tesla FSD is on the corner in the EU. Big companies throw supercomputers at autonomous driving (like Tesla's vision-only or heavy LiDAR setups -> here show images of both). But what happens when you try to put both a camera and a laser on a tiny, low-power edge device?

Keywords: Edge Computing, Sensor Fusion, The Perception Dilemma. -->


<!-- Slide 3 -->