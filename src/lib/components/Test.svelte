<svelte:options runes={true} />

<script lang="ts">
    import { onMount } from "svelte";

    let test = $state("asd")

    onMount(() => {
        setTimeout(() => {
            test = "dsa"
        }, 5000)
    })
</script>
{test}