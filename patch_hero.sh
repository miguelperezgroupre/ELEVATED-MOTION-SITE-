#!/bin/bash
sed -i 's/transition-all duration-75 ease-out/will-change-transform/g' src/components/Hero.tsx
sed -i 's/transition-all duration-100 ease-out/will-change-transform/g' src/components/Hero.tsx
sed -i 's/transition-all duration-150/will-change-transform/g' src/components/Hero.tsx
sed -i 's/h-screen/h-[100svh]/g' src/components/Hero.tsx
