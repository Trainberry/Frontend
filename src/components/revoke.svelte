<script>

    import {revoke, revokeMessage} from "$lib/store";

    let token = $state("");

</script>

<h4>Étape 1 - Indiquez le token à révoquer</h4>

<div>
    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" bind:value={token}>
</div>

<br />
        
<h4>Étape 2 - Révoquez le token</h4>

<button disabled={token.length === 0} class="btn btn-danger" onclick={revoke(token)}>Révoquer le token</button>

<div style={`color: ${$revokeMessage.color}`}>{$revokeMessage.message}</div>