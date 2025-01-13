<script>
    import Train from "../components/train.svelte";
    import { trains } from "$lib/store";
</script>

{#each $trains as train}
    <Train {train}></Train>
{/each}
