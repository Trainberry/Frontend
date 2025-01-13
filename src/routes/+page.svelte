<script>
    import Create from "../components/create.svelte";


    import Revoke from "../components/revoke.svelte";

</script>


<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation">
      <a class="nav-link active" data-bs-toggle="tab" href="#create" aria-selected="true" role="tab">Créer un token</a>
    </li>
    <li class="nav-item" role="presentation">
      <a class="nav-link" data-bs-toggle="tab" href="#revoke" aria-selected="false" tabindex="-1" role="tab">Révoquer un token</a>
    </li>
  </ul>
  <div id="myTabContent" class="tab-content">
    <div class="tab-pane fade show active" style="padding: 1rem" id="create" role="tabpanel">
        <Create></Create>
    </div>
    <div class="tab-pane fade" style="padding: 1rem" id="revoke" role="tabpanel">
        <Revoke></Revoke>
    </div>
  </div>