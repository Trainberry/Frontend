<script>

    import {createToken, validateToken, createTokenMessage, validateTokenMessage} from "$lib/store";

    let email = $state("");
    let token = $state("");

</script>

<h4>Étape 1 - Renseignez votre adresse mail</h4>

<div>
    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="noreply@uca.fr" bind:value={email}>
</div>

<br />
        
<h4>Étape 2 - Envoyez l'email de validation</h4>

<button class="btn btn-success" disabled={email.length === 0} onclick={createToken(email)}>Vérifier le mail</button>

<div style={`color: ${$createTokenMessage.color}`}>{$createTokenMessage.message}</div>

<br />
<br />
<h4>Étape 3 - Saisissez le code reçu par mail</h4>

<div>
    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="XXXXXXXXXXXXXXXX" bind:value={token}>
</div>
<br />


<h4>Étape 4 - Envoyez le code pour obtenir le token</h4>

<button class="btn btn-success" disabled={email.length === 0 || token.length === 0} onclick={validateToken(email, token)}>Confirmer le code</button>

<div style={`color: ${$validateTokenMessage.color}`}>{$validateTokenMessage.message}</div>
