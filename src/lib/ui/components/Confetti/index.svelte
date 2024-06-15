<!-- src/Confetti.svelte -->
<script lang="ts">
  // @ts-nocheck
  import { onMount } from 'svelte';
  import { confettiStore } from './store';

  // Variables to hold the canvas element and its rendering context
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  // Array to store confetti particles
  let confetti: any[] = [];

  // Configuration variables for the confetti
  const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
  const gravity = 0.5;
  const terminalVelocity = 5;
  const drag = 0.075;

  // Function to generate a random number within a range
  function randomRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Function to initialize confetti particles
  function initConfetti() {
    if (canvas) {
      for (let i = 0; i < 100; i++) {
        confetti.push({
          color: colors[Math.floor(randomRange(0, colors.length))],
          dimensions: {
            x: randomRange(5, 10),
            y: randomRange(10, 20),
          },
          position: {
            x: randomRange(0, canvas.width),
            y: canvas.height - 1,
          },
          rotation: randomRange(0, 2 * Math.PI),
          scale: {
            x: 1,
            y: 1,
          },
          velocity: {
            x: randomRange(-25, 25),
            y: randomRange(0, -50),
          },
        });
      }
    }
  }

  // Function to render confetti particles
  function renderConfetti(show: boolean) {
    if (!show) return;

    if (ctx && canvas) {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each particle
      confetti = confetti.filter((particle: any) => {
        let width = particle.dimensions.x * particle.scale.x;
        let height = particle.dimensions.y * particle.scale.y;

        // Move canvas to particle position and rotate it
        ctx.translate(particle.position.x, particle.position.y);
        ctx.rotate(particle.rotation);

        // Apply forces to velocity
        particle.velocity.x -= particle.velocity.x * drag;
        particle.velocity.y = Math.min(
          particle.velocity.y + gravity,
          terminalVelocity
        );
        particle.velocity.x +=
          Math.random() > 0.5 ? Math.random() : -Math.random();

        // Update particle position
        particle.position.x += particle.velocity.x;
        particle.position.y += particle.velocity.y;

        // Check if the particle is out of bounds
        if (particle.position.y >= canvas.height) {
          return false; // Remove particle if it is out of bounds
        }

        // Wrap particle horizontally
        if (particle.position.x > canvas.width) particle.position.x = 0;
        if (particle.position.x < 0) particle.position.x = canvas.width;

        // Draw confetti
        ctx.fillStyle = particle.color;
        ctx.fillRect(-width / 2, -height / 2, width, height);

        // Reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Apply rotation to the particle
        particle.rotation += particle.velocity.x * 0.01;

        return true; // Keep particle if it is still in bounds
      });

      // Request the next animation frame to continue rendering
      window.requestAnimationFrame(renderConfetti);
    }
  }

  // Lifecycle method to initialize the canvas and confetti
  onMount(() => {
    canvas = document.getElementById('confetti') as HTMLCanvasElement | null;
    if (canvas) {
      ctx = canvas.getContext('2d');

      if (ctx) {
        // Set canvas dimensions to match the window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Adjust canvas size on window resize
        window.addEventListener('resize', () => {
          if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          }
        });

        // Initialize and render confetti
        initConfetti();
        renderConfetti($confettiStore.show);
      }
    }
  });

  $: renderConfetti($confettiStore.show);
</script>

<!-- Canvas element to draw confetti -->
<canvas
  id="confetti"
  style="position: absolute; top: 0; left: 0; z-index: 9999;"
></canvas>

<style>
  /* Make the canvas non-interactive */
  canvas {
    pointer-events: none;
  }
</style>
