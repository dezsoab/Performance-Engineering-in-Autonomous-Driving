<template>
  <div v-if="$nav.currentPage !== 1" class="z-50">
    
    <div 
      class="absolute bottom-3 right-3 text-[12px] font-bold tracking-[0.01em] uppercase select-none z-50"
      style="color: rgba(0, 0, 0, 0.6);"
    >
      {{ $nav.currentPage }} / {{ $nav.total }}
    </div>

    <div class="absolute bottom-0 left-0 w-full h-[4px] bg-white/10 overflow-hidden z-50">
      <div 
        class="h-full bg-emerald-500 shadow-[0_0_15px_#10b981] transition-all duration-700 ease-out"
        :style="{ width: `${($nav.currentPage / $nav.total) * 100}%` }"
      />
    </div>
    
  </div>
</template>