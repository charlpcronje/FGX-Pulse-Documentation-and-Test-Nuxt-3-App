<template>
  <div ref="terminal" class="terminal"></div>
</template>

<script setup>
import { Terminal } from 'xterm';
import { onMounted, ref } from 'vue';
import { exec } from 'shelljs';

const terminal = ref(null);

onMounted(() => {
  const term = new Terminal();
  term.open(terminal.value);
  term.write('Terminal Emulator\r\n');
  
  term.onData(data => {
    const command = data.trim();
    const output = exec(command, { silent: true }).stdout;
    term.write(`\r\n${output}\r\n`);
    term.write('$ ');
  });
  
  term.write('$ ');
});
</script>

<style scoped>
.terminal {
  height: 300px;
}
</style>