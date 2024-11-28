<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<header class="bg-primary text-background shadow-md flex py-4 px-4 justify-between items-center">
    <div class="text-lg font-bold">
      <a href="/">LOGO</a>
    </div>
    <nav class="flex gap-12 text-white">
      <a href="/about" class="group transition duration-300">
        About
        <span class="block max-w-0 group-hover:max-w-full transition-bg duration-500 h-0.5 bg-white"></span>
      </a>
      <a href="/services" class="group transition duration-300">
        Services
        <span class="block max-w-0 group-hover:max-w-full transition-bg duration-500 h-0.5 bg-white"></span>
      </a>
      <a href="/contact" class="group transition duration-300">
        Contact
        <span class="block max-w-0 group-hover:max-w-full transition-bg duration-500 h-0.5 bg-white"></span>
      </a>
    </nav>
    <Button class="bg-white text-text border border-white hover:bg-primary hover:text-white hover:border font-bold py-2 px-4 rounded-lg">
      Sign In
    </Button>
</header>
