<template>
  <div class="p-8">
    <h2 class="text-xl font-bold mb-4">CodeChallenge Test</h2>
    <WorkspaceCodeChallenge
      title="Test Challenge"
      :points="10"
      :starter-html="'<div class=\'box\'></div>'"
      :starter-css="'.box { width: 100px; height: 100px; background: red; }'"
      :assertions="['.box has display:flex']"
    />
  </div>
</template>
