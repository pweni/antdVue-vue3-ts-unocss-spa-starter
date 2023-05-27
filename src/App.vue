<script setup></script>

<template>
    <a-config-provider>
        <RouterView />
    </a-config-provider>
</template>

<style>
:root {
    --scrollbarBG: #cce5ff;
    --thumbBG: #1890ff;
}
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
}
::-webkit-scrollbar-thumb {
    background-color: #74ebd5;
    background-image: linear-gradient(159deg, #74ebd5 0%, #9face6 100%);
}
</style>
